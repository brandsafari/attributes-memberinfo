import { User } from "@/User"

export function getUserWithIFrame() {
   return new Promise((resolve, reject) => {
      const iframe = document.createElement("iframe")

      iframe.src = "/user-account"
      iframe.width = "0"
      iframe.height = "0"
      iframe.style.display = "none"

      // Step 4: Append the iframe to the container
      document.body.appendChild(iframe)
      iframe.addEventListener("load", () => {
         const iframeWindow = iframe.contentWindow

         const userEmailInput = iframeWindow.document.getElementById("wf-user-account-email")
         const userNameInput = iframeWindow.document.getElementById("wf-user-account-name")
         const userAcceptCommunicationCheckbox = iframeWindow.document.getElementById(
            "wf-user-account-accept-communications"
         )

         const intervalId = setInterval(async () => {
            if (!userEmailInput.value || !userNameInput.value) return

            const user = new User({
               email: userEmailInput.value,
               name: userNameInput.value,
               acceptCommunications: userAcceptCommunicationCheckbox.checked,
            })

            clearInterval(intervalId)
            resolve(user)
         }, 10)

         setTimeout(() => {
            clearInterval(intervalId)
            reject("Could not get user data")
         }, 1200)
      })
   })
}
