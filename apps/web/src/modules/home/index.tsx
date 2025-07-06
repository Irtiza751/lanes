import { Button } from '@/shared/components/ui/button'
import { Helmet } from 'react-helmet-async'

function Home() {
  return (
    <div className="px-4 mx-auto pt-5">
      <Helmet>
        <title>Taskmaster | Home</title>
      </Helmet>

      <Button>Hi there</Button>
    </div>
  )
}

export default Home
