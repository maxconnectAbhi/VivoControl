
import {USER_REVIEWS, RESEND_OTP, USER_PROFILE, EDIT_PROFILE, PROFILE_IMAGE, ADD_ITEM, ITEM_DOCUMENT, DELETE_ITEM_BY_ID, EDIT_ITEM, EDIT_ITEM_DOCUMENT, BOOK_ITEM, FAVOURITE_LIST, FAVOURITE_REMOVE, BOOKING_EDIT, REVIEW_LIST, RATING_LIST, EARNING, EARNING_FILTER, EARNING_GRAPH, NOTIFICATION, DELETE_NOTIFICATION, GET_BANK, CHAT_LIST, CANCEL_REASON, ADMIN_CHAT, ORDER_COUNT, ACCEPT_BOOKING_PAYMENT_REQUEST, SEEN_NOTIFICATION, NOTIFICATION_COUNT, LOGOUT, CURRENT_CANCEL, BOOKING_STATUS } from "./URL";
import { Platform } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import AsyncKeys from '../Utils/AsyncKeys';
import { getAsync } from "../Utils/AsyncStorage";
 
const logOut = async () => {
    await AsyncStorage.clear()
   }

export async function PostApiToken(url,object) {
    const token = await getAsync(AsyncKeys.ASYNC_USER_TOKEN);
              return await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json',
                           'Authorization': token},
                body: JSON.stringify(object),
            }).then((response) => {
                const statusCode = response.status;
                console.log("statusCode", statusCode, url);
                const data = response.json();
                return Promise.all([statusCode, data]);
            })
                .then(([statusCode, data]) => {
                  console.log("data=", data);
                  data.message == 'Unauthorized access.' && logOut()

                   const responseObj = {
                        data: data,
                        status: statusCode
                    }
                    return responseObj;
                })
                .catch((error) => {
                    console.error(error);
                });
  }

  export async function PostApi(url,object) {
  
      console.log(url,object);
        return await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(object),
      }).then((response) => {
          const statusCode = response.status;
          console.log("statusCode", statusCode, url);
           
          const data = response.json();
          return Promise.all([statusCode, data]);
      })
          .then(([statusCode, data]) => {
               console.log("data=", data);
              const responseObj = {
                  data: data,
                  status: statusCode
              }

              return responseObj;
          })
          .catch((error) => {
              console.error(error);
          });
  }
  
  export async function GetApi(url){
    const token = await getAsync(AsyncKeys.ASYNC_USER_TOKEN);

        return await fetch( url, {
            method: 'GET',
            headers: {'Authorization': token},
        }).then((response) => {
            const statusCode = response.status;
            const data = response.json();
            return Promise.all([statusCode, data]);
        })
            .then(([statusCode, data]) => {
            console.log("statusCode", statusCode, data);

                data.message == 'Unauthorized access.' && logOut()
                const responseObj = {
                    data: data,
                    status: statusCode
                }
                return responseObj;
            })
            .catch((error) => {
                console.error('error= ', error);
            });
  }