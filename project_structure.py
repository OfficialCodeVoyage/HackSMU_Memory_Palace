import os
import json


def build_project_structure(path):
    project_structure = {}

    # Loop through the directory
    for root, dirs, files in os.walk(path):
        # Normalize the root to make it easier to represent in a hierarchy
        relative_root = os.path.relpath(root, path)
        if relative_root == ".":
            relative_root = ""

        # Insert current directory and files into the project structure
        folder_structure = project_structure
        if relative_root:
            for folder in relative_root.split(os.sep):
                folder_structure = folder_structure.setdefault(folder, {})

        # Add files in the current directory to the structure
        folder_structure['files'] = files

    return project_structure


def save_structure_to_json(structure, output_file):
    # Save the project structure to a JSON file
    with open(output_file, 'w') as f:
        json.dump(structure, f, indent=4)


if __name__ == "__main__":
    windows_path = input("Enter the Windows path to scan: ").strip()

    if os.path.exists(windows_path):
        project_structure = build_project_structure(windows_path)

        output_file = 'project_structure.json'
        save_structure_to_json(project_structure, output_file)
        print(f"Project structure saved to {output_file}")
    else:
        print("Invalid path. Please check the directory and try again.")
