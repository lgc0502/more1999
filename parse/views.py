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
from operator import itemgetter

classification=['違規停車','路燈故障','噪音舉發','騎樓舉發','道路維修','交通運輸','髒亂及汙染','民生管線','動物救援']
return_category=['違規停車','路燈故障','噪音舉發','騎樓舉發','道路維修','交通運輸','髒亂汙染','民生管線','動物救援']
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
def home(request):
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
            for i in reverse_geocode_result:
                for c in i['address_components']:
                    if 'administrative_area_level_4' in c['types']:
                        li = c['long_name']
                    if area is None:
                        if 'administrative_area_level_3' in c['types']:
                            area = c['long_name']
        except:
            print("geocoding-problem")
            li = '未知'
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
    last_end = past
    last_begin = last_end-datetime.timedelta(days = 7)
    date['today'] = now
    date['week_begin'] = past
    date['last_end'] = last_end
    date['last_begin'] = last_begin
    return date

def seconds_format(second):
    days = int(second/86400)
    hours = int((second%86400)/(3600))
    minutes = int((second%3600)/(60))
    delta_time = str(days)+'天'+str(hours)+'小時'+str(minutes)+'分鐘'
    return delta_time

def overview():
    returndata = {}
    thisweek = week_date()
    all_data = API_DATA.objects.filter(requested_datetime__range = [thisweek['week_begin'], thisweek['today']])
    returndata['TotalNum'] = len(all_data)
    returndata['FinishNum'] = len( all_data.filter(status = '已完工') )
    returndata['UnFinishNum'] = returndata['TotalNum'] - returndata['FinishNum']
    if returndata['TotalNum'] != 0:
        returndata['CompleteRate'] = returndata['FinishNum']/returndata['TotalNum']
    else:
        returndata['CompleteRate'] = 0
    return returndata

def Area_statistic(begin,end):
    returndata = {}
    all_data = API_DATA.objects.filter(requested_datetime__range = [begin, end]).values('area', 'status', 'requested_datetime','service_name','updated_datetime')
    returndata['All']={}
    returndata['All']['TotalNum'] = len(all_data)
    returndata['All']['Category'] = Category_statistic(all_data)
    returndata['All']['HourNum'] = Hour_statistic(all_data)
    returndata['All']['DailyNum'] = WeekDay_statistic(all_data,begin,end)
    returndata['All']['Time']=Time_statistic(all_data,begin,end)
    for d in range(len(classification)):
        if(returndata['All']['Time'][eng_class[d]]['Seconds'] == 0):
            returndata['All']['Time'][eng_class[d]]['Formated'] = ''
    for index in range(len(town_name)):
        area_data = all_data.filter(area = town_name[index]) 
        returndata[town_id[index]]={}
        returndata[town_id[index]]['TotalNum'] = len(area_data)
        returndata[town_id[index]]['Category'] = Category_statistic(area_data)
        returndata[town_id[index]]['HourNum'] = Hour_statistic(area_data)
        returndata[town_id[index]]['DailyNum'] = WeekDay_statistic(area_data,begin,end)
        returndata[town_id[index]]['Time'] = Time_statistic(area_data,begin,end)
        for d in range(len(classification)):
            if(returndata[town_id[index]]['Time'][eng_class[d]]['Seconds'] == 0 ):
                returndata[town_id[index]]['Time'][eng_class[d]]['Formated'] = ''
    
    return returndata

def Category_statistic(objs):
    returndata = {}
    temp = []
    for index in range(len(classification)):
        returndata[eng_class[index]] = 0
    for obj in objs:
        if obj['service_name'] == classification[0]:
            returndata[eng_class[0]] = returndata[eng_class[0]] + 1 
        elif obj['service_name'] == classification[1]:
            returndata[eng_class[1]] = returndata[eng_class[1]] + 1 
        elif obj['service_name'] == classification[2]:
            returndata[eng_class[2]] = returndata[eng_class[2]] + 1 
        elif obj['service_name'] == classification[3]:
            returndata[eng_class[3]] = returndata[eng_class[3]] + 1 
        elif obj['service_name'] == classification[4]:
            returndata[eng_class[4]] = returndata[eng_class[4]] + 1 
        elif obj['service_name'] == classification[5]:
            returndata[eng_class[5]] = returndata[eng_class[5]] + 1 
        elif obj['service_name'] == classification[6]:
            returndata[eng_class[6]] = returndata[eng_class[6]] + 1 
        elif obj['service_name'] == classification[7]:
            returndata[eng_class[7]] = returndata[eng_class[7]] + 1 
        elif obj['service_name'] == classification[8]:
            returndata[eng_class[8]] = returndata[eng_class[8]] + 1          
    return returndata

def Hour_statistic(objs):
    returndata = {}
    temp = []
    for d in range(0,24):
        temp.append([])
    for obj in objs:
        obj_time = obj['requested_datetime'] + datetime.timedelta(hours=8)
        temp[int(obj_time.strftime('%H'))].append(obj)
    for d in range(0,24):
        returndata[str(d)] = Category_statistic(temp[d])  
    return returndata
   
def WeekDay_statistic(objs,begin,end):
    returndata = {}
    temp = []
    for d in range(0,7):
        query_date = begin + datetime.timedelta(days=d)
        query_end = query_date + datetime.timedelta(days=1)
        date = query_date.strftime('%Y-%m-%d')
        for obj in objs:
            obj_time = obj['requested_datetime']+datetime.timedelta(hours=8)
            if obj_time.strftime('%Y-%m-%d') == date:
                temp.append(obj)  
        returndata[date] = Category_statistic(temp)    
        temp = []
    return returndata
    
def Time_statistic(objs,begin,end):
    returndata = {}
    for index in range(len(classification)):
        total = 0
        delta = 0
        returndata[eng_class[index]]={}
        for obj in objs:
            if obj['status'] == '已完工' and obj['service_name'] == classification[index]:
                requested = obj['requested_datetime']
                updated = obj['updated_datetime']
                if requested != updated:
                    delta = delta+((updated-requested).total_seconds())
                    total = total+1
        if total == 0:
            delta_time = '0:0:0'
            returndata[eng_class[index]]['Seconds'] = 0
        else:
            delta_time = seconds_format(delta/total)
            returndata[eng_class[index]]['Seconds'] = int(delta/total)
        returndata[eng_class[index]]['Num'] = total
        returndata[eng_class[index]]['Formated'] = delta_time       
    return returndata

def Cityreport():
    returndata = {}
    Date = week_date()
    returndata['Thisweek'] = {}
    returndata['Thisweek']['Detail'] = Area_statistic(Date['week_begin'], Date['today'])
    returndata['Lastweek'] = {}
    returndata['Lastweek']['Detail'] = Area_statistic(Date['last_begin'], Date['last_end'])
    
    returndata['Thisweek']['Hotzone'] = {}
    returndata['Lastweek']['Hotzone'] = {}
    for index in range(len(town_name)):
        returndata['Lastweek']['Hotzone'][town_id[index]] = returndata['Lastweek']['Detail'][town_id[index]]['TotalNum']
        returndata['Thisweek']['Hotzone'][town_id[index]] = returndata['Thisweek']['Detail'][town_id[index]]['TotalNum']
    return returndata

def Personalreport(qlat, qlng):
    returndata = {}
    Date = week_date()
    POI_obj = API_DATA.objects.filter(requested_datetime__range = [Date['week_begin'], Date['today']], 
                    lat__range = [qlat-0.007,qlat+0.007], lng__range = [qlng-0.007,qlng+0.007]).values('area', 
                    'status', 'requested_datetime','service_name','updated_datetime')
    returndata['Category'] = Category_statistic(POI_obj)
    returndata['HourNum'] = Hour_statistic(POI_obj)
    returndata['DailyNum'] = WeekDay_statistic(POI_obj,Date['week_begin'], Date['today'])
    returndata['Time'] = Time_statistic(POI_obj, Date['week_begin'], Date['today'])
    for d in range(len(classification)):
        if(returndata['Time'][eng_class[d]]['Seconds'] == 0):
            returndata['Time'][eng_class[d]]['Formated'] = ''
    detail=[]
    temp={}
    unfinish=[]
    for index in range(len(POI_obj)):
        for d in range(len(classification)):
            if POI_obj.values()[index]['service_name'] == classification[d]:
                temp['category'] = eng_class[d]
        timetmp = POI_obj.values()[index]['requested_datetime']+datetime.timedelta(hours = 8)
        temp['date'] = timetmp.strftime('%Y-%m-%d %H:%M:%S')
        temp['description'] = POI_obj.values()[index]['description']
        temp['status'] = POI_obj.values()[index]['status']
        temp['position'] = [POI_obj.values()[index]['lat'], POI_obj.values()[index]['lng']]
        if temp['status'] == '未完成':
            unfinish.append(temp)
        detail.append(temp)
        temp = {}
    returndata['Detail']=detail
    returndata['Unfinish']=unfinish
    return returndata

def Data_return(request):
    lat = float(request.GET['lat'])
    lng = float(request.GET['lon'])
    Response = {}
    Response['Overview'] = overview()
    print('done')
    Response['Cityreport'] = Cityreport()
    print('done')
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
        Response['Personalreport'] = Personalreport(22.997234,120.211936) 
        Response['Personalreport']['Address']='台南火車站'
    else:
        Response['Personalreport'] = Personalreport(lat, lng) 
        if poi_exist == 1:
            Response['Personalreport']['Address']=poi
        else:
            Response['Personalreport']['Address']=address
    print('done')
    return JsonResponse(Response)

def explore(request): 
    Response={}
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
        Response = Personalreport(22.997234,120.211936) 
        Response['position']=[22.997234,120.211936]
        Response['result']= 'failed'
    else:
        Response = Personalreport(lat, lng)
        Response['position']=[lat, lng]
        Response['result']= 'success'
    return JsonResponse(Response)

def test(request):
    get_new_data()
    update_status()
    return render(request, 'index.html')