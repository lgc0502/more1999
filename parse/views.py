from django.shortcuts import render
from datetime import datetime
from lxml import etree
import requests
import datetime
import xmltodict
import json
import googlemaps
from pprint import pprint
from parse.models import API_DATA, Test, Unfinish
from django.utils import timezone
import json
from django.http import JsonResponse




def get_Key():
    with open('./parse/config.json' , 'r') as reader:
        jf = json.loads(reader.read())
    return jf['API_KEY']
gmaps = googlemaps.Client(key=get_Key())
def hello_world(request):
    return render(request, 'index.html')

def new_node(key, value):
    node = etree.Element(key)
    node.text = etree.CDATA(value)
    return node

def call_api_by_date(begin_date, end_date):
    API = 'http://open1999.tainan.gov.tw:82/ServiceRequestsQuery.aspx'
    root = etree.Element("root")
    root.append(new_node('city_id','tainan.gov.tw'))
    root.append(new_node('start_date', begin_date))
    root.append(new_node('end_date', end_date))
    headers = {'Content-Type': 'application/xml'}
    body = etree.tostring(root, xml_declaration=True)
    r = requests.post(API, data=body, headers=headers)
    x = xmltodict.parse(r.text)
    return x

def call_api_by_id(sid):
    API = 'http://open1999.tainan.gov.tw:82/ServiceRequestsQuery.aspx'
    root = etree.Element("root")
    root.append(new_node('city_id','tainan.gov.tw'))
    root.append(new_node('service_request_id', sid))
    headers = {'Content-Type': 'application/xml'}
    body = etree.tostring(root, xml_declaration=True)
    r = requests.post(API, data=body, headers=headers)
    x = xmltodict.parse(r.text)
    return x

def data_preprocess(raw_data):
    service_request_id = raw_data['service_request_id']#
    requested_datetime = raw_data['requested_datetime']#
    status = raw_data['status']#
    area = raw_data['area']#
    service_name = raw_data['service_name']
    subproject = raw_data['subproject']
    address_string = raw_data['address_string']#
    updated_datetime = raw_data['updated_datetime']#
    expected_datetime = raw_data['expected_datetime']#
    description = raw_data['description']
    keyword = raw_data['keyword']#
    service_notice = raw_data['service_notice']#
    lat = raw_data['lat']#
    lng = raw_data['long']#
    error = 0
    if(status is None):
        status = '未完成'
    if(updated_datetime is None):
        updated_datetime = requested_datetime
    if(expected_datetime is None):
        expected_datetime = requested_datetime  
    if keyword is None:
        keyword = '無案件描述'
    if service_notice is None:
        service_notice = '無服務案件說明'

    if(address_string is None):
        point = 0
        if(description is None):
            print('fuck')
        if('路燈' not in description):
            point = max(description.find("路"),description.find("街"))
            point = max(description.find("段"),point)
            point = max(description.find("巷"),point)
            point = max(description.find("弄"),point)
            point = max(description.find("號"),point)
        if('路燈' in description):
            temp = description.find("路燈")
            point = max(description[0:temp].rfind("路"),description[0:temp].rfind("街"))
            point = max(description[0:temp].rfind("段"),point)
            point = max(description[0:temp].rfind("巷"),point)
            point = max(description[0:temp].rfind("號"),point)
            point = max(description[0:temp].rfind("弄"),point)
        if point != -1:
            address_string = description[0:point+1]
    
    if (address_string is not None):
        if '台南' not in address_string:
            address_string = '台南市' + address_string
        if '到' in address_string:
            address_string = address_string.replace('到', '*')
        if(lat is None or lng is None):
            geocode_result = gmaps.geocode(address_string, language='zh-TW')
            lat = geocode_result[0]['geometry']['location']['lat']
            lng = geocode_result[0]['geometry']['location']['lng']
        reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language='zh-TW')
        for i in reverse_geocode_result:
            for c in i['address_components']:
                if 'administrative_area_level_4' in c['types']:
                    li = c['long_name']
                if area is None:
                    if 'administrative_area_level_3' in c['types']:
                        area = c['long_name']
    else:
        error = 1
    if(service_name is None):
        if('路燈' in description):
            service_name = '路燈故障'
        elif('噪音' in description or '妨害安寧' in description):
            service_name = '噪音舉發'
        elif('違' in description or '停' in description or '車' in description):
            service_name = '違規停車'
        else:
            service_name = '無'
            error = 1
    if(subproject is None):
        subproject = '無'
    if error == 1:
        return -1
    else:
        data = {
            'service_request_id' : service_request_id,
            'requested_datetime' : requested_datetime,
            'status' : status,
            'area' : area,
            'li' : li,
            'service_name' : service_name,
            'subproject' : subproject,
            'address_string' : address_string,
            'updated_datetime' : updated_datetime,
            'expected_datetime' : expected_datetime,
            'description' : description,
            'keyword' : keyword,
            'service_notice' : service_notice,
            'lat' : lat,
            'lng' : lng
        }
        return data

def get_new_data():
    now=datetime.datetime.today() 
    past = now-datetime.timedelta(days=7)  
    now = now.strftime('%Y-%m-%d %H:%M:%S')
    past = past.strftime('%Y-%m-%d %H:%M:%S')
    d = call_api_by_date(past, now)
    
    if d['root']['count'] != '0':
        for index in range(0,int(d['root']['count'])):
            if d['root']['count'] == '1':
                data = data_preprocess(d['root']['records']['record'])
            else:
                data = data_preprocess(d['root']['records']['record'][index])
            if data != -1:
                search = API_DATA.objects.filter(service_request_id=data['service_request_id'])
                if len(search) == 0: #newdata
                    r1 = API_DATA(
                        service_request_id = data['service_request_id'],
                        requested_datetime = data['requested_datetime'],
                        status = data['status'],
                        area = data['area'],
                        li = data['li'],
                        keyword = data['keyword'],
                        service_name = data['service_name'],
                        subproject = data['subproject'],
                        description = data['description'],
                        lat = data['lat'],
                        lng = data['lng'],
                        address_string = data['address_string'],
                        service_notice = data['service_notice'],
                        updated_datetime = data['requested_datetime'],
                        expected_datetime = data['requested_datetime']
                    )
                    r1.save()
                search = Unfinish.objects.filter(service_request_id=data['service_request_id'])
                if len(search) == 0 and data['status'] != '已完工': #unfinish
                    r1 = Unfinish(
                        service_request_id = data['service_request_id'],
                        requested_datetime = data['requested_datetime'],
                        status = data['status'],
                        updated_datetime = data['requested_datetime'],
                        expected_datetime = data['requested_datetime']
                    )
                    r1.save()

def update_status():
    qid = ''
    search = Unfinish.objects.filter(status='未完成')
    if len(search) != 0:
        for index in range(0,len(search)):
            qid = search.values()[index]['service_request_id']+","+qid
        update_data = call_api_by_id(qid)
        if update_data['root']['count'] != '0':
            for index in range(0,int(update_data['root']['count'])):
                if update_data['root']['count'] == '1':
                    data = update_data['root']['records']['record']
                else:
                    data = update_data['root']['records']['record'][index]
                if data['status'] is None:
                    data['status'] = '未完成'
                if '已' in data['status']:
                    print(data['service_request_id'])
                    API_DATA.objects.filter(service_request_id=data['service_request_id']).update(status='已完工')
                    search = Unfinish.objects.filter(service_request_id=data['service_request_id'])
                    search.delete()

def test(request):
    
    get_new_data()
    update_status()
    return render(request, 'index.html')


def village_visualization(request):
    time_format = '%Y-%m-%d'
    town = request.GET['town']
    village = request.GET['village'] 
    begin_date = datetime.datetime.strptime(request.GET['begin_date'], time_format)
    end_date = datetime.datetime.strptime(request.GET['end_date'], time_format) 
    delta =  (end_date-begin_date).days 
    categoryByTime={}
    classification=['違規停車','路燈故障','噪音舉發','騎樓舉發','道路維修','交通運輸','髒亂及汙染','民生管線','動物救援']
    eng_class=["parking","light","noise","aisle","road","traffic","dirty","pipe", "animal"]
    donut={}
    if town == '台南市':
        date_search = API_DATA.objects.filter(requested_datetime__range = [begin_date,end_date]) 
        for index in range(len(classification)):
            donut[eng_class[index]]=[0,0]
            donut[eng_class[index]][0]=len(date_search.filter(service_name = classification[index]))
            donut[eng_class[index]][1]=(donut[eng_class[index]][0]/len(date_search))*100
        categoryByTime['Donut']=donut
        temp={}
        temp2={}
        for d in range(0,delta):
            query_date = begin_date + datetime.timedelta(days=d)
            query_end = query_date + datetime.timedelta(days=1)
            date_search = API_DATA.objects.filter(requested_datetime__range = [query_date,query_end]) 
            for index in range(len(classification)):
                temp[eng_class[index]]=len(date_search.filter(service_name = classification[index]))
            query_date_string = query_date.strftime('%Y-%m-%d')
            temp2[query_date_string]=temp
            temp={}
        categoryByTime['Area']=temp2

    else:
        temp={}
        temp2={}
        for d in range(0,delta):
            query_date = begin_date + datetime.timedelta(days=d)
            query_end = query_date + datetime.timedelta(days=1)
            date_search = API_DATA.objects.filter(requested_datetime__range = [query_date,query_end], area=town, li=village) 
            for index in range(len(classification)):
                temp[eng_class[index]]=len(date_search.filter(service_name = classification[index]))
            query_date_string = query_date.strftime('%Y-%m-%d')
            temp2[query_date_string]=temp
        categoryByTime['Area']=temp2
    return JsonResponse(categoryByTime)

def Donut_chart(request):
    today=datetime.datetime.today()-datetime.timedelta(days=1)
    today_date = today.strftime('%Y-%m-%d')
    weekday = today.weekday()
    print(today)
    past = today-datetime.timedelta(days=weekday)
    past_date = past.strftime('%Y-%m-%d')
    print(past_date)
    
    return render(request, 'index.html')

