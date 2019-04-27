import json


dic = '{"name": "Anthony", "age": 24}'

new_dic = json.loads(dic)


print(new_dic['name'])