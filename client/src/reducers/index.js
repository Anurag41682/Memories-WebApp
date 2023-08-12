import { combineReducers } from "redux";
import posts from "./posts";
import auth from "./auth";
export default combineReducers({
  posts, //can also be wriitein as posts:posts since value is same
  auth,
});
