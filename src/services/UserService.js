import React from "react";
import axios from "axios";

class UserService extends React.Component {
  getUsers() {
    return axios.get(`https://jsonplaceholder.typicode.com/users`);
  }

  getPosts() {
    return axios.get(`https://jsonplaceholder.typicode.com/posts`);
  }

  getAlbums(userId) {
    return axios.get(`https://jsonplaceholder.typicode.com/albums`);
  }

  getPhotos(userId) {
    return axios.get(`https://jsonplaceholder.typicode.com/photos`);
  }

  getRideInGroup(userId) {
    return [
      { userId: 1, days: "always" },
      { userId: 2, days: "Sometimes" },
      { userId: 3, days: "Never" },
      { userId: 4, days: "Sometimes" },
      { userId: 5, days: "Sometime" },
      { userId: 6, days: "always" },
      { userId: 7, days: "always" },
      { userId: 8, days: "always" },
      { userId: 9, days: "always" },
      { userId: 10, days: "always" }
    ];
  }

  getDaysOfTheWeek(userId) {
    return [
      { userId: 1, days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
      { userId: 2, days: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
      { userId: 3, days: ["Mon", "Wed", "Fri"] },
      { userId: 4, days: ["Mon", "Tue", "Wed"] },
      { userId: 5, days: ["Sun", "Sat"] },
      { userId: 6, days: ["Fri", "Sun"] },
      { userId: 7, days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
      { userId: 8, days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
      { userId: 9, days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
      { userId: 10, days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] }
    ];
  }
}

const instance = new UserService();
Object.freeze(instance);

export default instance;
