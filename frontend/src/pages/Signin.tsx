import Auth from "../components/Auth"
import Quote from "../components/Quote"


function Signin() {
  return (
    <div>
      <div className="grid lg:grid-cols-2 grid-cols-1">
        <div>
            <Auth type="signin" />
        </div>
        <div className="lg:block hidden">
          <Quote/>
        </div>
      </div>
    </div>
  )
}

export default Signin