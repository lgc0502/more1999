from django.shortcuts import render
from datetime import datetime , date
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
import pytz

classification=['違規停車','路燈故障','噪音舉發','騎樓舉發','道路維修','交通運輸','髒亂及汙染','民生管線','動物救援']
eng_class=["parking","light","noise","aisle","road","traffic","dirty","pipe", "animal"]
town_name=['新營區','鹽水區','白河區','柳營區','後壁區','東山區','麻豆區','下營區','六甲區','官田區',
            '大內區','佳里區','學甲區','西港區','新化區','善化區','新市區','安定區','山上區','玉井區',
            '楠西區','南化區','左鎮區','仁德區','歸仁區','關廟區','龍崎區','永康區','北區','七股區',
            '將軍區','北門區','安南區','南區','東區','安平區','中西區']
town_id=['R01','R02','R03','R04','R05','R06','R07','R08','R09','R10',
        'R11','R12','R17','R13','R18','R19','R20','R21','R22','R23',
        'R24','R25','R26','R27','R28','R29','R30','R31','D04','R14',
        'R15','R16','D06','D02','D01','D07','D08']
tw = pytz.timezone('Asia/Taipei')

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
    print(raw_data)
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
        try:
            li = '未知'
            if '台南' not in address_string:
                address_string = '台南市' + address_string
            if '到' in address_string:
                address_string = address_string.replace('到', '*')
            if(lat is None or lng is None):
                    geocode_result = gmaps.geocode(address_string, language='zh-TW')
                    lat = geocode_result[0]['geometry']['location']['lat']
                    lng = geocode_result[0]['geometry']['location']['lng']
            reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language='zh-TW')
            print(reverse_geocode_result)
            for i in reverse_geocode_result:
                for c in i['address_components']:
                    if 'administrative_area_level_4' in c['types']:
                        li = c['long_name']
                    if area is None:
                        if 'administrative_area_level_3' in c['types']:
                            area = c['long_name']
        except:
            print("geocoding-problem")
            error = 1
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
    now = datetime.datetime.today()  #check?
    past = datetime.datetime.today()-datetime.timedelta(days = 2)
    now = now.strftime('%Y-%m-%d %H:%M:%S')
    past = past.strftime('%Y-%m-%d %H:%M:%S')
    d = call_api_by_date(past, now)
    process = 0
    if d['root']['count'] != '0':
         for index in range(0,int(d['root']['count'])):
            if d['root']['count'] == '1':
                raw_data = d['root']['records']['record']
            else:
                raw_data = d['root']['records']['record'][index]
            search = API_DATA.objects.filter(service_request_id=raw_data['service_request_id'])
            if len(search) == 0: #new data
                data = data_preprocess(raw_data)
                process = 1
                if data != -1:
                    try:
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
                            updated_datetime = data['updated_datetime'],
                            expected_datetime = data['expected_datetime']
                        )
                        r1.save()
                        print("save")
                    except:
                        print("save data error")
            search = Unfinish.objects.filter(service_request_id=raw_data['service_request_id'])
            if len(search) == 0 and raw_data['status'] != '已完工': #unfinish
                if process != 1 :
                    data = data_preprocess(raw_data)
                if data != -1:
                    try:
                        r1 = Unfinish(
                            service_request_id = data['service_request_id'],
                            requested_datetime = data['requested_datetime'],
                            status = data['status'],
                            updated_datetime = data['updated_datetime'],
                            expected_datetime = data['expected_datetime']
                        )
                        r1.save()
                    except:
                        print("save unfinish error")
    
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
                    print("**"+data['service_request_id'])
                    API_DATA.objects.filter(service_request_id=data['service_request_id']).update(status='已完工')
                    API_DATA.objects.filter(service_request_id=data['service_request_id']).update(updated_datetime=data['updated_datetime'])
                    search = Unfinish.objects.filter(service_request_id=data['service_request_id'])
                    search.delete()

def test(request):
    get_new_data()
    update_status()
    #unfinish_detail()
    return render(request, 'index.html')

def update():
    get_new_data()
    update_status()

def week_date():
    date = {}
    time_format = '%Y-%m-%d'
    now = datetime.datetime.today().strftime('%Y-%m-%d')
    now = datetime.datetime.strptime(now, time_format).replace(tzinfo=tw)
    weekday = (now.weekday()+1)%7
    past = now-datetime.timedelta(days = weekday)
    now = now+datetime.timedelta(days = 1)
    date['today'] = now
    date['week_begin'] = past
    return date

def seconds_format(second):
    days = int(second/(3600*24))
    hours = int((second%(3600*24))/(3600))
    minutes = int((second%3600)/(60))
    delta_time = str(days)+':'+str(hours)+':'+str(minutes)
    return delta_time

def lw_donut(begin_date, end_date):
    donut = {}
    date_search = API_DATA.objects.filter(requested_datetime__range = [begin_date,end_date]) 
    for index in range(len(classification)):
        donut[eng_class[index]]=[0,0]
        donut[eng_class[index]][0]=len(date_search.filter(service_name = classification[index]))
        if(len(date_search)!=0):
            donut[eng_class[index]][1]=(donut[eng_class[index]][0]/len(date_search))*100
        else:
            donut[eng_class[index]][1] = 0
    return donut

def lw_hotzone(begin_date, end_date):
    hotzone = {}
    date_search = API_DATA.objects.filter(requested_datetime__range = [begin_date,end_date])
    for index in range(len(town_name)):
        hotzone[town_id[index]]={}
        area_search = date_search.filter(area = town_name[index])
        hotzone[town_id[index]]['total']=len(area_search)
        hotzone[town_id[index]]['category']={}
        hotzone[town_id[index]]['time']={}
        for d in range(len(classification)):
            delta = 0
            total = 0
            hotzone[town_id[index]]['category'][eng_class[d]] = len(area_search.filter(service_name = classification[d]))
            finish_task = area_search.filter(updated_datetime__range = [begin_date,end_date],status = '已完工',service_name = classification[d])
            for i in range(len(finish_task)):
                requested = finish_task.values()[i]['requested_datetime']
                updated = finish_task.values()[i]['updated_datetime']
                if requested != updated:
                    delta = delta+(updated- requested).total_seconds()
                    total = total+1
            if total == 0:
                delta_time = '0:0:0'
            else:
                delta_time = seconds_format(delta/total)
            hotzone[town_id[index]]['time'][eng_class[d]] = delta_time
    return hotzone

def lw_time_num(begin_date, end_date, town, village):
    temp={}
    time_num={}
    delta =  (end_date-begin_date).days 
    for d in range(0,delta):
        query_date = begin_date + datetime.timedelta(days=d)
        query_end = query_date + datetime.timedelta(days=1)
        if town == '台南市':
            date_search = API_DATA.objects.filter(requested_datetime__range = [query_date,query_end]) 
        else:
            date_search = API_DATA.objects.filter(requested_datetime__range = [query_date,query_end], area=town, li=village) 
        for index in range(len(classification)):
            temp[eng_class[index]]=len(date_search.filter(service_name = classification[index]))
        query_date_string = query_date.strftime('%Y-%m-%d')
        time_num[query_date_string]=temp
        temp={}
    return time_num
    
def tw_finish_rate(begin_date, end_date):
    finish_donut={}
    date_search = API_DATA.objects.filter(requested_datetime__range = [begin_date, end_date]) 
    finished = date_search.filter(status = '已完工')
    finish_donut['finish'] = [0,0]
    finish_donut['unfinish'] = [0,0]
    finish_donut['finish'][0] = len(finished)
    finish_donut['unfinish'][0] = len(date_search)-len(finished)
    if(len(date_search)!=0):
        finish_donut['finish'][1] = 100*finish_donut['finish'][0]/len(date_search)
        finish_donut['unfinish'][1] = 100*finish_donut['unfinish'][0]/len(date_search)
    else:
        finish_donut['finish'][1] = 0
        finish_donut['unfinish'][1] = 0
    return finish_donut

def unfinish_detail():
    detail=[]
    temp={}
    search = Unfinish.objects.all()
    now = datetime.datetime.today().replace(tzinfo=tw)
    for index in range(len(search)):
        id_search = API_DATA.objects.filter(service_request_id = search.values()[index]['service_request_id'])
        temp['category'] = id_search.values()[0]['service_name']
        timetmp = id_search.values()[0]['requested_datetime']+datetime.timedelta(hours = 8)
        temp['date'] = timetmp.strftime('%Y-%m-%d %H:%M:%S')
        temp['address'] = id_search.values()[0]['address_string']
        temp['description'] = id_search.values()[0]['description']
        temp['area'] = id_search.values()[0]['area']
        delta = (now - id_search.values()[0]['requested_datetime'].replace(tzinfo=tw)).total_seconds()
        delta_time = seconds_format(delta)
        temp['time'] = delta_time
        detail.append(temp)
        temp = {}
    return detail

def tw_category(begin_date, end_date):
    donut = {}
    date_search = API_DATA.objects.filter(requested_datetime__range = [begin_date,end_date]) 
    for index in range(len(classification)):
        all = date_search.filter(service_name = classification[index])
        donut[eng_class[index]]=[0,0]
        donut[eng_class[index]][0]=len(all.filter(status = '已完工'))
        donut[eng_class[index]][1]=len(all)-donut[eng_class[index]][0]
    return donut

def position_search(qlat, qlng):
    data = {}
    detail=[]
    temp={}
    thisweek = week_date()
    search = API_DATA.objects.filter(requested_datetime__range = [thisweek['week_begin'],thisweek['today']], 
                    lat__range = [qlat-0.005,qlat+0.005], lng__range = [qlng-0.005,qlng+0.005])
    for index in range(len(classification)):
        all = search.filter(service_name = classification[index])
        temp[eng_class[index]]=len(all)
    data['category']=temp  
    temp={}
    for index in range(0,24):
        all = search.filter(requested_datetime__hour = index)
        temp[str(index)] = len(all)
    data['hour']=temp
    temp={}
    for index in range(len(search)):
        temp['category'] = search.values()[index]['service_name']
        timetmp = search.values()[index]['requested_datetime']+datetime.timedelta(hours = 8)
        temp['date'] = timetmp.strftime('%Y-%m-%d %H:%M:%S')
        temp['description'] = search.values()[index]['description']
        temp['status'] = search.values()[index]['status']
        temp['position'] = [search.values()[index]['lat'], search.values()[index]['lng']]
        detail.append(temp)
        temp = {}
    data['detail']=detail
    return data

def village_visualization(request):
    time_format = '%Y-%m-%d'
    town = request.GET['town']
    village = request.GET['village'] 
    begin_date = datetime.datetime.strptime(request.GET['begin_date'], time_format).replace(tzinfo=tw)
    end_date = datetime.datetime.strptime(request.GET['end_date'], time_format).replace(tzinfo=tw)
    
    categoryByTime={}
    if town == '台南市':
        categoryByTime['Donut'] = lw_donut(begin_date, end_date)
        categoryByTime['Area'] = lw_time_num(begin_date, end_date, town, village)
        categoryByTime['Hotzone'] = lw_hotzone(begin_date, end_date)
    else:
        categoryByTime['Area'] = lw_time_num(begin_date, end_date, town, village)
    return JsonResponse(categoryByTime)

def this_week_data(request):
    categoryByTime={}
    thisweek = week_date()
    categoryByTime['UnfinishList'] = unfinish_detail()
    categoryByTime['FinishRate'] = tw_finish_rate(thisweek['week_begin'], thisweek['today'])
    categoryByTime['Category'] = tw_category(thisweek['week_begin'], thisweek['today'])
    return JsonResponse(categoryByTime)

def explore(request): 
    returndata={}
    Query_address = request.GET['location'] 
    if '台南' not in Query_address:
        Query_address = '台南市' + Query_address
    geocode_result = gmaps.geocode(Query_address, language='zh-TW')
    lat = geocode_result[0]['geometry']['location']['lat']
    lng = geocode_result[0]['geometry']['location']['lng']
    reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language='zh-TW')
    for i in reverse_geocode_result:
        for c in i['address_components']:
            if 'administrative_area_level_1' in c['types']:
                city = c['long_name']
    if '台南' not in city:
        return JsonResponse(returndata)
    else:
        returndata = position_search(lat, lng)
        returndata['position']=[lat, lng]
        return JsonResponse(returndata)

def position(request): 
    returndata={}
    lat = float(request.GET['lat'])
    lng = float(request.GET['lon'])
    poi_exist = 0
    poi = ''
    address_exist = 0
    reverse_geocode_result = gmaps.reverse_geocode((lat, lng), language='zh-TW')
    for i in reverse_geocode_result:
        if address_exist == 0:
            address = i['formatted_address']
            address_exist = 1
        for c in i['address_components']:
            if 'administrative_area_level_1' in c['types']:
                city = c['long_name']
            if 'point_of_interest' in c['types']:
                poi = c['long_name']
                poi_exist = 1
    if '台南' not in city:
        return JsonResponse(returndata)
    else:
        returndata = position_search(lat, lng)
        if poi_exist == 1:
            returndata['address']=poi
        else:
            returndata['address']=address
    return JsonResponse(returndata)