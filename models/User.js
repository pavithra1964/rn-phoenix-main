import moment from "moment";

class User {
  constructor(
    id,
    name,
    emailid,
    mobile,
    address,
    isActive,
    isApproved,
    pushToken,
    doj
  ) {
    this.id = id;
    this.name = name;
    this.emailid = emailid;
    this.mobile = mobile;
    this.address = address;
    this.isActive = isActive;
    this.isApproved = isApproved;
    this.pushToken = pushToken;
    this.doj = doj;
  }

  get readabledoj() {
    return moment(this.doj).format("MMMM Do YYYY, hh:mm");
  }
}

export default User;
