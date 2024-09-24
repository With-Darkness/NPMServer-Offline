import requests


def get_top_version_node_modules(node_module_name, numbers):
    count_downloads_url = f'https://api.npmjs.org/versions/{node_module_name}/last-week'

    # response from request url
    response = requests.get(count_downloads_url)
    data = response.json()

    # sort the data by values in descendign order
    sorted_data_desc = dict(sorted(
        data['downloads'].items(), key=lambda x: x[1], reverse=True))

    # get the top {numbers} versions of node_module
    top_versions = list(sorted_data_desc.keys())[:numbers]
    return top_versions


get_top_version_node_modules('fastify', 10)
