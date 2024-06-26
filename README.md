# Rêvélations
Welcome on Rêvélations !  Here you can store and analyze your dreams easily !
Rêvélations is an application to store your dreams and analyze them thanks to the MeaningCloud API. You can provide extra informations such as themes, people and emotions you encountered during your dream.

# Table of contents
[Teck Stack](#Teck%20Stack)  
[Installation](#Installation)  
[Structure](#Structure)  
[Functionalities](#Functionalities)

# Teck Stack
### Languages 
The application is developped using react native and expo. The style is created using the react native paper librairy.

### API
The application is connected to the [MeaningCloud API](https://learn.meaningcloud.com/developer/topics-extraction/2.0/doc) for the cemantic analyzing of the dreams in the storage.

### Storage
The application stores the dreams in its local async storage. For a wider use, a database would be created and linked.

# Installation
Node.js is mandatory for the project.

### Launching an expo project
The command `npx create-expo-app --template expo-template-tabs` is used to create the project.
The command `npx expo install --save react-native-paper` is used to integrate the react native paper librairy.
The commmabd `npx expo install @react-native-async-storage/async-storage` is used to have the possibility to create an async storage.

### Upgrading this project
- Clone this repository on your device
- Launch your terminal at the root of the project
- Execute the command `npm install`
- create a .env file at your project root with the variables `EXPO_PUBLIC_API_URL=htttps://yourapiurl`, for [Meaning Cloud](https://api.meaningcloud.com/topics-2.0), and `EXPO_PUBLIC_API_KEY=yourApiKey`  
You can now add your code to the project !

### Starting the project
To start use the command `npx expo` at the root of your project and then follow the informations listed in your terminal.

# Structure
The application is a single-page application and is composed of 5 tabs.
#### Index
The home page is the form where you write your dreams (title of your dream, main content and date of the dream) and add if needed if the dream was lucid and some informations with the different lists. When sent your dream is stored in the async storage of your device. For now, the selected infos in the lists are not resetted on submit and the date can't be modified once selected and approved, this will be adressed in a future update.  
  
![index tab](image.png)  
![index tab with input filled](image-1.png)

#### History
The history page let you see all your dreams and informations you added to them. You can search by the dream titles with the search bar.
In a future update you will be able to mark some dreams as favorite to find them more easily.  
  
![history tab](image-2.png)

#### Analyze
The analyze tab is where the request to the meaningcloud API is done, by selecting a dream title, you can see all the cemantic analysis done by the API. You can also search by the dream titles with the search bar.  
In a future update, both history and analyze tabs will only be one.  
  
![analyze tab with analysis of a dream](image-4.png)

#### Astuces 
The astuces tab is where you can find all sorts of tips and advices on your sleep and dreams.  
  
![astuces tab with one tip presented](image-5.png)

#### Parameters
The parameters tab si where you can add some informations to the lists of people, themes and emotions to add precision to the cemantic analysis. In a future update, you will be able to modify/delete some and a night theme switch will be added.  
  
![parameters tab](image-3.png)

# Functionalities

The Home tab has an additional tab on the question mark icon to present the app and it's functionnalities.  
  
The tab Astuces contains different astuces that appears in a random order when the tab is visited.  
The tab Parameters contains a form to add extra information that then appears on the main page in the selected category. It also has a button to clear all the async storage.  
