import {
  observable,
  action,
  useStrict,
  runInAction,
  computed,
  toJS
} from "mobx";

import UserService from "../services/UserService";

import _map from "lodash/map";
import _find from "lodash/find";
import _filter from "lodash/filter";
import _findLast from "lodash/findLast";
import _findIndex from "lodash/findIndex";
import _isEmpty from "lodash/isEmpty";

useStrict(true);

const rideOptions = [
  { label: "Always", id: 0 },
  { label: "Sometimes", id: 1 },
  { label: "Never", id: 2 }
];

const daysOptions = [
  { label: "Sun", id: 0 },
  { label: "Mon", id: 1 },
  { label: "Tue", id: 2 },
  { label: "Wed", id: 3 },
  { label: "Thu", id: 4 },
  { label: "Fri", id: 5 },
  { label: "Sat", id: 6 }
];

class UserState {
  @observable loading = false;
  @observable users = {};
  @observable filteredUsers = {};
  @observable posts = {};
  @observable albums = {};
  @observable photos = {};
  @observable rideInGroup = [];
  @observable daysOfTheWeek = [];
  @observable rideOptionsSelecteds = [];
  @observable daysOptionsSelecteds = [];
  @observable inputUserName = "";
  @observable inputName = "";
  @observable inputEmail = "";
  @observable inputCity = "";

  @computed
  get userList() {
    return toJS(this.filteredUsers);
  }

  @computed
  get rideOptionsList() {
    return toJS(rideOptions);
  }

  @computed
  get rideOptionsSelectedsList() {
    return toJS(this.rideOptionsSelecteds);
  }

  @computed
  get daysOptionsList() {
    return toJS(daysOptions);
  }

  @computed
  get daysOptionsSelectedsList() {
    return toJS(this.daysOptionsSelecteds);
  }

  @action
  loadRegisters() {
    this.loading = true;
    let promises = [];

    promises.push(UserService.getUsers());
    promises.push(UserService.getPosts());
    promises.push(UserService.getAlbums());
    promises.push(UserService.getPhotos());
    promises.push(UserService.getRideInGroup());
    promises.push(UserService.getDaysOfTheWeek());

    Promise.all(promises)
      .then(response => {
        runInAction("Load users - success", () => {
          this.users = response[0].data;
          this.filteredUsers = response[0].data;
          this.posts = response[1].data;
          this.albums = response[2].data;
          this.photos = response[3].data;
          this.rideInGroup = response[4];
          this.daysOfTheWeek = response[5];
          this.loading = false;
        });
      })
      .catch(error => {
        runInAction("Load users - error", () => {
          this.loading = false;
          console.log(error);
        });
      });
  }

  getPostByUser(userId) {
    const post = _filter(this.posts, function(post) {
      return post.userId == userId;
    });

    return post.length;
  }

  getAlbumsByUser(userId) {
    const album = _filter(this.albums, function(album) {
      return album.userId == userId;
    });

    return album.length;
  }

  getPhotosByUser(userId) {
    let photos = 0;
    const albums = _filter(this.albums, function(album) {
      return album.userId == userId;
    });

    _map(albums, album => {
      photos += _filter(this.albums, function(album) {
        return album.userId == userId;
      }).length;
    });

    return photos;
  }

  getRideInGroupByUser(userId) {
    const rideInGroup = _filter(this.rideInGroup, function(ride) {
      return ride.userId == userId;
    });

    return rideInGroup[0].days;
  }

  getDaysOfTheWeek(userId) {
    const daysOfTheWeek = _filter(this.daysOfTheWeek, function(days) {
      return days.userId == userId;
    });

    if (daysOfTheWeek[0].days.length == 7) {
      return "Every day";
    } else if (
      this.arrayContains(daysOfTheWeek[0].days, [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri"
      ]) &&
      daysOfTheWeek[0].days.length == 5
    ) {
      return "Week days";
    } else if (this.arrayContains(daysOfTheWeek[0].days, ["Sun", "Sat"])) {
      return "Weekends";
    } else {
      return toJS(daysOfTheWeek[0].days).join(", ");
    }

    return daysOfTheWeek[0].days;
  }

  arrayContains(targets, array) {
    let validate = [];
    _map(targets, target => {
      if (array.indexOf(target) > -1) {
        validate.push(true);
      }
    });

    return validate.length === targets.length;
  }

  @action
  removeUser(id) {
    this.users = _filter(this.users, function(user) {
      return user.id != id;
    });

    // this.loadRegisters();
    this.filteredUsers.replace(this.users);
  }

  @action
  toggleOptionSelected(value, atribute) {
    const elem = _find(this[atribute], item => item.id == value.id);
    if (elem) {
      this[atribute].splice(
        _findIndex(this[atribute], item => item.id == value.id),
        1
      );
    } else {
      this[atribute].push(value);
    }
  }

  @action
  toggleUniqueOptionSelected(value, atribute) {
    const elem = _find(this[atribute], item => item.id == value.id);
    if (elem) {
      this[atribute].splice(
        _findIndex(this[atribute], item => item.id == value.id),
        1
      );
    } else {
      this[atribute] = [];
      this[atribute].push(value);
    }
  }

  @action
  updateNewUserAttr(value, attr) {
    this[attr] = value;
  }

  @action
  discardUser() {
    this.rideOptionsSelecteds = [];
    this.daysOptionsSelecteds = [];
    this.inputUserName = "";
    this.inputName = "";
    this.inputEmail = "";
    this.inputCity = "";
  }

  checkData() {
    if (
      toJS(this.rideOptionsSelecteds) === [] ||
      toJS(this.daysOptionsSelecteds) === [] ||
      this.inputUserName === "" ||
      this.inputName === "" ||
      this.inputEmail === "" ||
      this.inputCity === ""
    ) {
      alert("Por favor prencha todos os campos!");
      return false;
    }
    return true;
  }

  @action
  saveUser() {
    if (!this.checkData()) {
      return;
    }

    let user = {};
    user.id =
      _findLast(toJS(this.users), function(res) {
        return res.id;
      }).id + 1;
    user.address = { city: this.inputCity };
    user.email = this.inputEmail;
    user.name = this.inputName;
    user.username = this.inputUserName;
    this.users.push(user);

    let ride = {};
    ride.userId =
      _findLast(toJS(this.rideInGroup), function(res) {
        return res.userId;
      }).userId + 1;
    ride.days = this.rideOptionsSelecteds[0].label.toLowerCase();
    this.rideInGroup.push(ride);

    let days = {};
    days.days = _map(toJS(this.daysOptionsSelecteds), day => {
      return day.label;
    });
    days.userId =
      _findLast(toJS(this.daysOfTheWeek), function(res) {
        return res.userId;
      }).userId + 1;
    this.daysOfTheWeek.push(days);

    // this.loadRegisters();
    this.filteredUsers.replace(this.users);
    this.discardUser();
  }

  normalizeValue(value) {
    var string = value;
    var mapHex = {
      a: /[\xE0-\xE6]/g,
      e: /[\xE8-\xEB]/g,
      i: /[\xEC-\xEF]/g,
      o: /[\xF2-\xF6]/g,
      u: /[\xF9-\xFC]/g,
      c: /\xE7/g,
      n: /\xF1/g
    };

    for (var word in mapHex) {
      var expressaoRegular = mapHex[word];
      string = string.replace(expressaoRegular, word);
    }

    return string;
  }

  @action
  search(value) {
    value = this.normalizeValue(value);
    let filteredList = this.users;
    const listOfValues = value.toLowerCase().split(" ");

    listOfValues.forEach(word => {
      filteredList = toJS(this.searchForWord(filteredList, word));
    });

    this.filteredUsers.replace(filteredList);
  }

  @action
  searchForWord(listaFiltrada, value) {
    if (!_isEmpty(value)) {
      listaFiltrada = listaFiltrada.filter(user => {
        let foundUserName =
          this.normalizeValue(user.username.toLowerCase().trim()).indexOf(
            value.trim()
          ) != -1;
        let foundName =
          this.normalizeValue(user.name.toLowerCase().trim()).indexOf(
            value.trim()
          ) != -1;
        let foundEmail =
          this.normalizeValue(user.email.toLowerCase().trim()).indexOf(
            value.trim()
          ) != -1;
        let foundCity =
          this.normalizeValue(user.address.city.toLowerCase().trim()).indexOf(
            value.trim()
          ) != -1;

        return foundUserName || foundName || foundEmail || foundCity;
      });
    }

    return listaFiltrada;
  }
}

export default UserState;
