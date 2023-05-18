import { getUserWithIFrame } from "$utils/userIFrame"
import { User } from "./User"
import { isLoggedIn } from "./utils/authStatus"

const userEmailElements = Array.from(document.querySelectorAll("[brs-memberinfo=email]"))
const userNameElements = Array.from(document.querySelectorAll("[brs-memberinfo=name]"))

const USERDATA_KEY = "brsUserData"

window.Webflow ||= []
window.Webflow.push(async () => {
   if (window.location.href.includes("/user-account")) return
   if (!isLoggedIn()) {
      localStorage.removeItem(USERDATA_KEY)
      return
   }

   let user
   const userData = localStorage.getItem(USERDATA_KEY)
   if (userData) {
      user = new User(JSON.parse(userData))
   } else {
      try {
         user = await getUserWithIFrame()
         localStorage.setItem(USERDATA_KEY, JSON.stringify(user))
      } catch (err) {
         console.log(err)
      }
   }
   userEmailElements.forEach(el => (el.innerText = user.email))
   userNameElements.forEach(el => (el.innerText = user.name))
})
