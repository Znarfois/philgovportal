const yesBtn = document.getElementById("yes");
// const noBtn = document.getElementById("no");
const modal = document.getElementById("modal");
const db = firebase.database();
const yesdb = firebase.database();

  const userCookieName = "returningVisitor";
  checkUserCookie(userCookieName);
  
  function checkUserCookie(userCookieName) {
    const regEx = new RegExp(userCookieName, "g");
    const cookieExists = document.cookie.match(regEx);
    if (cookieExists != null) {
      console.log("Yay a cookie!");
    } else {
      createUserCookie(userCookieName);
      db.ref("totalHits").transaction(
        (totalHits) => totalHits + 1,
        (error) => {
          if (error) {
            console.log(error);
          } 
        }
      );
    }
  }
  
  function createUserCookie(userCookieName) {
    const userCookieValue = "Yes";
    const userCookieDays = 7;
    let expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + userCookieDays);
    document.cookie =
      userCookieName +
      "=" +
      userCookieValue +
      "; expires=" +
      expiryDate.toGMTString() +
    "path=/";
  }

yesBtn.addEventListener('click', (e) => {
    modal.style.display = "none";
    db.ref("totalYes").transaction(
        (totalYes) => totalYes + 1,
        (error) => {
          if (error) {
            console.log(error);
          }
        }
      );
});

// noBtn.addEventListener('click', (e) => {
//     modal.style.display = "none";
// });