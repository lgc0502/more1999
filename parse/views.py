from django.shortcuts import render
from datetime import datetime
from lxml import etree
import requests
import datetime
import xmltodict
import json
import googlemaps
from parse.models import API_DATA
from django.utils import timezone
import json
from django.http import JsonResponse


API = 'http://open1999.tainan.gov.tw:82/ServiceRequestsQuery.aspx'

def get_Key():
    with open('./parse/config.json' , 'r') as reader:
        jf = json.loads(reader.read())
    print(jf['API_KEY'])
    return jf['API_KEY']
gmaps = googlemaps.Client(key=get_Key())

def hello_world(request):
    return render(request, 'index.html')

def new_node(key, value):
    node = etree.Element(key)
    node.text = etree.CDATA(value)
    return node

def daily_update(request):
    today=datetime.datetime.today() 
    yesterday = today-datetime.timedelta(days=7)  
    today = today.strftime('%Y-%m-%d')
    yesterday = yesterday.strftime('%Y-%m-%d')
    root = etree.Element("root")
    root.append(new_node('city_id','tainan.gov.tw'))
    root.append(new_node('start_date', yesterday))
    root.append(new_node('end_date', today))
    headers = {'Content-Type': 'application/xml'}
    body = etree.tostring(root, xml_declaration=True)
    r = requests.post(API, data=body, headers=headers)
    d = xmltodict.parse(r.text)
    num = 0
    for index in range(0,len(d['root']['records']['record'])):
        #len(d['root']['records']['record'])
        #print(d['root']['records']['record'][index])
        temp = d['root']['records']['record'][index]
        service_request_id = temp['service_request_id']
        requested_datetime = temp['requested_datetime']
        status = temp['status']
        keyword = temp['keyword']
        area = temp['area']
        service_name = temp['service_name']
        subproject = temp['subproject']
        description = temp['description']
        address_string = temp['address_string']
        lat = temp['lat']
        lng = temp['long']
        service_notice = temp['service_notice']
        updated_datetime = temp['updated_datetime']
        expected_datetime = temp['expected_datetime']
        if (address_string is not None):
            if '台南' not in address_string:
                address_string = '台南市' + address_string
            if(lat is None or lng is None):
                geocode_result = gmaps.geocode(address_string, language='zh-TW')
                lat = geocode_result[0]['geometry']['location']['lat']
                lng = geocode_result[0]['geometry']['location']['lng']
            reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language='zh-TW')
            for i in reverse_geocode_result:
                for c in i['address_components']:
                    if 'administrative_area_level_4' in c['types']:
                        li = c['long_name']
            if(subproject is None):
                subproject = 'temp'
            if(area is None):
                area = 'temp'
            if(service_name is None):
                service_name = 'temp'
            print("*"+service_request_id,status,keyword,service_name,subproject)
            print("\t"+description,service_notice,updated_datetime,expected_datetime)
            print("\t"+area,li,address_string,)
            r1 = API_DATA(service_request_id = service_request_id,
                    requested_datetime = requested_datetime,
                    status = 'temp',
                    keyword = 'temp',
                    area = area,
                    li = li,
                    service_name = service_name,
                    subproject = subproject,
                    description = 'temp',
                    address_string = address_string,
                    lat = lat,
                    lng = lng,
                    service_notice = 'temp',
                    updated_datetime = requested_datetime,
                    expected_datetime = requested_datetime
                )
            r1.save()
        else:
            print("error")
        
    print(len(d['root']['records']['record']))
    return render(request, 'index.html')


def village_visualization(request):
    begin_date = request.GET['begin_date']
    end_date = request.GET['end_date']
    town = request.GET['town']
    village = request.GET['village'] 
    time_format = '%Y-%m-%d'
    print(town)
    begin_date = datetime.datetime.strptime(begin_date, time_format)
    end_date = datetime.datetime.strptime(end_date, time_format) 
    search = API_DATA.objects.filter(area=town)
    delta =  (end_date-begin_date).days
    categoryByTime={}
    temp = {
        'Donut':{
            "traffic": [4,20], 
            "aisle": [4,20], 
            "parking": [4,20], 
            "animal": [4,20], 
            "noise": [4,20], 
            "light": [4,20], 
            "road": [4,20], 
            "dirty": [4,20], 
            "pipe": [4,20]
        },
        'Area':{
            "2018-07-17": {
                "traffic": 0, 
                "aisle": 0, 
                "parking": 0, 
                "animal": 0, 
                "noise": 0, 
                "light": 0, 
                "road": 0, 
                "dirty": 0, 
                "pipe": 0
            }, 
            "2018-07-18": {
                "traffic": 0, 
                "aisle": 0, 
                "parking": 0, 
                "animal": 0, 
                "noise": 0, 
                "light": 0, 
                "road": 0, 
                "dirty": 0, 
                "pipe": 0
            }, 
            "2018-07-16": {
                "traffic": 0, 
                "aisle": 0, 
                "parking": 0, 
                "animal": 0, 
                "noise": 0, 
                "light": 0, 
                "road": 0, 
                "dirty": 0, 
                "pipe": 0
            }, 
            "2018-07-20": {
                "traffic": 0, 
                "aisle": 0, 
                "parking": 0, 
                "animal": 0, 
                "noise": 0, 
                "light": 0, 
                "road": 0, 
                "dirty": 0, 
                "pipe": 0
            }, 
            "2018-07-19": {
                "traffic": 0, 
                "aisle": 0, 
                "parking": 0, 
                "animal": 0, 
                "noise": 0, 
                "light": 0, 
                "road": 0, 
                "dirty": 0, 
                "pipe": 0
            }, 
            "2018-07-21": {
                "traffic": 0, 
                "aisle": 0, 
                "parking": 0, 
                "animal": 0, 
                "noise": 0, 
                "light": 0, 
                "road": 0, 
                "dirty": 0, 
                "pipe": 0
            }, 
            "2018-07-15": {
                "traffic": 0, 
                "aisle": 0, 
                "parking": 0, 
                "animal": 0, 
                "noise": 0, 
                "light": 0, 
                "road": 0, 
                "dirty": 0, 
                "pipe": 0
            }
        }
    }
    for d in range(0,delta):
        query_date = begin_date + datetime.timedelta(days=d)  
        query_end = query_date + datetime.timedelta(days=1)
        date_search = search.filter(requested_datetime__range = [query_date,query_end]) 
        query_date_string = query_date.strftime('%Y-%m-%d')
        service_dict={}
        
        service_name_num = date_search.filter(service_name = '違規停車') 
        service_dict['parking'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '路燈故障') 
        service_dict['light'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '噪音舉發') 
        service_dict['noise'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '騎樓舉發') 
        service_dict['aisle'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '道路維修') 
        service_dict['road'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '交通運輸') 
        service_dict['traffic'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '髒亂及汙染') 
        service_dict['dirty'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '民生管線') 
        service_dict['pipe'] = len(service_name_num)
        service_name_num = date_search.filter(service_name = '動物救援') 
        service_dict['animal'] = len(service_name_num)
        categoryByTime[query_date_string]=service_dict
        print(categoryByTime)
        #for i in range(0,len(date_search)):
            #print(date_search[i].li, date_search[i].address_string, date_search[i].service_name, date_search[i].requested_datetime)
    return JsonResponse(temp)

def Donut_chart(request):
    today=datetime.datetime.today()-datetime.timedelta(days=1)
    today_date = today.strftime('%Y-%m-%d')
    weekday = today.weekday()
    print(today)
    past = today-datetime.timedelta(days=weekday)
    past_date = past.strftime('%Y-%m-%d')
    print(past_date)
    
    return render(request, 'index.html')