import {SideBar,Map,User} from '../components'

function AppLayout() {
  return (
    <div className="flex w-full">
        <SideBar/>
        <User/>
        <Map/>
    </div>
  )
}

export default AppLayout