# -*- coding: utf-8 -*-
import os
import json
import csv
import pprint

# open source file
with open('map.json') as data_file:    
    map = json.load(data_file)

# open and add information about all files that are csv names
data = []
countries = {}
for filename in os.listdir(os.path.dirname(os.path.realpath(__file__))):
	if filename.endswith('csv'):
		name = filename[:-4]
		print "processing " + name + "..."
		reader = csv.reader(open(filename, 'rU'), quotechar='"', delimiter = ',') 
		data = list(reader)
	
		country_name = '';
		country = {};
		datapoint = '';
		datapoint_index = 0;
		for index in range(1,len(data[0])):
			country_name = data[0][index]
			country = {}
			if not country_name in countries:
				countries[country_name] = {}
			
			if country_name != '':
				datapoint = ""
				try:
					for datapoint_index in range(9):
						datapoint = data[datapoint_index][index]
						if data[datapoint_index][0] != '':
							country[data[datapoint_index][0]] = data[datapoint_index][index]
					country['short_code'] = name.translate(None, '. ()')
					if country != {}:
						countries[country_name][name] = country
				except IndexError:
					print "index error: " + filename + ' ' + country_name + ' ' + str(datapoint_index) + ' ' + datapoint
					print data[datapoint_index-1][index]
		print "processing " + name + " done."
foundcountries = []
		
for country in map['features']:
	if 'properties' in country:
		if 'name' in country['properties']:
			country_name = country['properties']['name']
			if country_name not in countries:
				print "No data found for " + country_name
			else:
				country['properties']['exceptions'] = countries[country_name]
				foundcountries.append(country_name)
		else:
			print "Problem, no name"
	else:
		print 'problem, no properties'
		
for name in countries:
	if name not in foundcountries:
		print "data for " + name + " not added." 

with open('result.json', 'w') as fp:
    json.dump(map, fp)