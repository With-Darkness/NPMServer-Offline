import os
import sys
import subprocess
# Path to the storage folder containing the .tgz files
storage_folder = './temp_data'
# URL of the Verdaccio server (replace with your Verdaccio server URL)
verdaccio_server_url = "http://192.168.112.101:4873"


def publish_to_verdaccio(tgz_file_path):
    """ Publishes a .tgz file to the Verdaccio server. """
    try:
        print(
            f"Publishing {tgz_file_path} to Verdaccio server at {verdaccio_server_url}")
        print(os.path.exists(tgz_file_path))
        # Run the 'npm publish' command to publish the .tgz file
        # subprocess.run(["npm", "publish", tgz_file_path, "--registry",
        #                verdaccio_server_url], check=True)
        os.system(
            f'npm publish {tgz_file_path} --registry {verdaccio_server_url}')
        print(f"Successfully published {tgz_file_path} to Verdaccio.")
    except subprocess.CalledProcessError as e:
        print(f"Error publishing {tgz_file_path}: {e}")


# add user to verdaccio
# os.system(f'npm adduser --registry {verdaccio_server_url}')

# login to verdaccio
os.system(f'npm login --registry {verdaccio_server_url}')

# List all .tgz files in the storage folder
tgz_files = [f for f in os.listdir(storage_folder) if f.endswith(".tgz")]

if not tgz_files:
    print("No .tgz files found in the storage folder to publish.")
else:
    # Publish each .tgz file to Verdaccio
    for tgz_file in tgz_files:
        tgz_file_path = os.path.join(storage_folder, tgz_file)
        publish_to_verdaccio(tgz_file_path)

print("All .tgz files have been processed.")
