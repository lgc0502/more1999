from lxml import etree
import requests
import datetime
import xmltodict
import json
from parse.models import Post

API = 'http://open1999.tainan.gov.tw:82/ServiceRequestsQuery.aspx'

def new_node(key, value):
    node = etree.Element(key)
    node.text = etree.CDATA(value)
    return node

def call_api():
    for index in range(0,2):
        print("hi")
    '''
    today=datetime.datetime.today() 
    yesterday = today-datetime.timedelta(days=2)  
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
    for index in range(0,2):
        print("hi")
        #len(d['root']['records']['record'])
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
        if(lat is None or lng is None): #no lat and lng 
            print("hi")
        else:'''
            #li = reverse_geo(lat, lng)
        
       
        
#def reverse_geo(Lat, Lng):

#    return li