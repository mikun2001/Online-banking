import { Box } from '@material-ui/core'
import FirstSection from '../src/components/pages/homePageComponents.js/FirstSection'
import OurServices from '../src/components/pages/homePageComponents.js/OurServices'
import Branches from '../src/components/pages/homePageComponents.js/Branches'
import Footer from '../src/Layout/Footer'
import ContctUs from "../src/components/pages/homePageComponents.js/ContctUs";

export default function Home() {
  return (
    <Box>
        <FirstSection />
        <Box my={4} />
        <OurServices />
        <Box my={4} />
        <ContctUs />
        <Box my={4} />
        <Branches />
        <Box my={3} />
        <Footer />
    </Box>
  )
}

Home.Title = 'Home'
Home.Layout = null