# get the list of node modules in npm server
import requests
npm_modules = requests.get('https://registry.npmjs.org/-/all').json()

print(npm_modules)
