# Memory Prevention Wiki

Memory prevention is crucial for cognitive health, especially for individuals with Alzheimer’s and dementia. This project categorizes images into specific stacks that can assist in improving memory retention. By leveraging techniques like the Method of Loci, we aim to enhance memory recall through visual aids.

## Table of Contents
**Introduction**

**Method of Loci**

**Relation to Alzheimer's and Dementia**

**Inspiration**

**What It Does**

**How We Built**

**Image Detection Methodology**

**Sorting Mechanism**

**Contribution**

Memory prevention is crucial for cognitive health, especially for individuals with Alzheimer’s and dementia. This project categorizes images into specific stacks that can assist in improving memory retention. By leveraging techniques like the Method of Loci, we aim to enhance memory recall through visual aids.

## Method of Loci

The **Method of Loci**, also known as the **Memory Palace technique**, is a mnemonic strategy that involves visualizing a familiar place and associating specific items or information with different locations within that space. This technique leverages spatial memory, allowing individuals to recall information by mentally "walking" through the environment.

### How the Method of Loci Works:
1. **Choose a Familiar Place**: Select a location you know well, such as your kitchen,farm or library
2. **Identify Distinct Locations**: Identify specific objects within that location (e.g. spoon, book).
3. **Create Associations**: Associate each piece of information you want to remember with a specific spot.
4. **Mental Walkthrough**: When you need to recall the information, mentally stack the objects and retrieve the associated memory.

## Relation to Alzheimer’s and Dementia

The Method of Loci can be particularly beneficial for individuals with Alzheimer’s and dementia, as it:
- **Enhances Memory Recall**: Utilizes spatial memory, which may be more intact than verbal memory.
- **Creates Stronger Associations**: Forms stronger mental connections, aiding in memory retrieval.
- **Encourages Active Engagement**: Stimulates the brain and can potentially slow cognitive decline.
- **Provides Structure**: Organizes memories spatially, helping individuals navigate their memories more effectively.


## Inspiration
The inspiration behind this project stems from the need to help individuals who suffer from Alzheimer's and dementia—conditions that impair memory and cognitive abilities. These diseases rob people of their precious memories, making daily life increasingly difficult. One of the most effective methods for memory enhancement is the Method of Loci, which uses spatial visualization to associate memories with familiar locations. We sought to bring this powerful mnemonic technique into the digital age by creating a tool that categorizes and sorts images into "memory stacks", helping patients retain visual associations and organize their thoughts.

Our goal was to build a system that aids memory recall by using image detection, classification, and sorting methods to support a structured environment that works alongside cognitive therapies. By presenting these images in a categorized and organized way, this project helps people with memory impairments stay connected to familiar objects, faces, and places.


## What It Does
The Memory Prevention Project provides a platform that detects and classifies images, organizes them into meaningful categories (or "stacks"), and presents them in a structured way to help with memory recall.
In essence, the system acts as a memory assistant, organizing key memories into easy-to-navigate categories and reinforcing the use of visual memory aids to improve recall.

## How We Built
### Technology Stack:
- Python: The core programming language used to build the application, handling the logic for image detection, sorting, and data processing.
- OpenCV: A powerful computer vision library used for image detection, feature extraction, and image classification.
- Pillow (PIL): A Python Imaging Library used to manipulate images (e.g., resizing, enhancing).
- OpenAI's DALL·E API: Integrated for image generation where custom images may be generated to reinforce specific memory associations.
- GitHub Wiki: The project’s documentation and guide were developed and hosted on GitHub Wiki to ensure clear communication and collaboration.
### Development Process:
***Research and Ideation***

- We started by researching the Method of Loci and exploring how visual aids could enhance memory for individuals suffering from Alzheimer’s and dementia. We realized the potential of using a digital tool to categorize visual memory aids.
Image Detection and Sorting:

- We implemented OpenCV to detect key features in the uploaded images and categorize them. The system analyzes factors like content type, color scheme, and emotions to sort images into the appropriate stack.
These stacks represent groups of memories, such as family members, familiar places, or important events.
Memory Stacking Logic:

- The core of the project was building the stacking logic. Each image detected is assigned a category based on predefined criteria. This categorized memory stack mimics the Method of Loci, where images can be retrieved based on associations.
The stacking mechanism allows users to see a visual representation of the categorized memories, making it easier for them to recall certain events or details.
User Interface Design:

- We designed the user interface to be minimalist and accessible. Given the intended user base (individuals with cognitive impairments and their caregivers), we kept the interface simple, with large icons and an easy-to-navigate layout.
  
***OpenAI Integration***

- For cases where users need custom images for specific memories or objects, we integrated OpenAI’s DALL·E API, allowing for the generation of personalized, high-quality images.
  
***Testing and Feedback***

- After developing a prototype, we conducted user tests to ensure the platform was intuitive and effective for its target audience. Feedback from caregivers and healthcare professionals helped refine the image sorting criteria and memory stack organization.

## Implementation in the Project
- **Incorporate Visual Aids**: Create a digital memory palaces where users can visualize their memories and associate images with specific categories.
- **Customizable Memory palaces**: Allow users to customize their memory palaces, adding personal touches meaningful to them.
- **Guided Reminders**: Develop guided tasks to help users practice the Method of Loci, reinforcing memory recall.

## Image Detection Methodology
The image detection process involves:

- **Image Acquisition**: Collect images through user input or from a directory.
- **Image Processing**: Analyze and detect objects in the images.
- **Classification**: Sort images into stacks based on detected features or predefined categories.

## Sorting Mechanism
Images will be sorted based on various criteria, such as:

- Kitchen (e.g., Spoon, banana)

- Animals (e.g.cow, parrot, hen)

- School (e.g.books, pen)

- Office (e.g., files, desk, conference table)

## Contributing
Contributions are welcome! If you have suggestions for improvements or additional features, feel free to open an issue or submit a pull request.
 
