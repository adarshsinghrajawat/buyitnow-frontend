import Header from "../usercomponents/Header"
import Footer from "../usercomponents/Footer"
import MainSlider from "../usercomponents/MainSlider"
import DealsSlider from "../usercomponents/DealsSlider"
import Spacer from "../usercomponents/Spacer"
//import Trending from "../usercomponents/Trending"
import ExploreCategory from "../usercomponents/ExplorCategory"
import Trending from "../usercomponents/Trending"
import ExploreNewCategory from "../usercomponents/ExploreNewCategory"

import TrendingProducts from "../usercomponents/TrendingProducts"
import BestDeals from "../usercomponents/BestDeals"
export default function Home(props) {

     return (<div>

          <Header />
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', margin: 10 }}>
               <div style={{ width: '100%' }}>
                    <MainSlider />
               </div>
               <Spacer />
               <div style={{ width: '100%' }}>
                    <DealsSlider />
               </div>
               <div style={{ width: '100%' }}>
                    <Trending />
               </div>
               <div style={{ width: '100%' }}>
                    <ExploreCategory />
               </div>
               <div style={{ width: '100%' }}>
                    <BestDeals />
               </div>
               <div style={{ width: '100%' }}>
                    <TrendingProducts />
               </div>
               <div style={{ width: '100%' }}>
                    <ExploreNewCategory />
               </div>
               <Footer />
          </div>
     </div>

     )
}