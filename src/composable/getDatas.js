import { ref } from "vue"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

const getDatas = () => {
  const datas = ref([])
  const error = ref(null)

  const load = async () => {
    try {
      const res = await db.collection("mens").get()
      datas.value = res.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        }
      })
    } catch (err) {
      error.value = err.message
    }
  }
  return { datas, error, load }
}

export default getDatas
