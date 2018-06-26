import {
  observable,
  action,
  useStrict,
  runInAction,
  computed,
  toJS
} from "mobx";
import UserService from "../services/UserService";
import _filter from "lodash/filter";
import _map from "lodash/map";

useStrict(true);

class UserState {
  @observable users = {};
  @observable posts = {};
  @observable albums = {};
  @observable photos = {};
  @observable rideInGroup = [];
  @observable daysOfTheWeek = [];
  @observable loading = false;

  @computed
  get userList() {
    return toJS(this.users);
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

    console.log(
      "daysOfTheWeek[0].days.length == 5",
      daysOfTheWeek[0].days.length
    );
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
  }
}

export default UserState;
