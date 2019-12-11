import Layout from '../components/MyLayout.js'

export default function Index() {
  return (
    <Layout>
      <h1>This the homepage</h1>

      <p>
        Adipiscing sed lacus torquent ut nec consequat ad per sed volutpat a praesent vestibulum a hendrerit euismod himenaeos cum suspendisse erat proin dui non tincidunt ullamcorper etiam. Eget ad nam porta urna vel vulputate orci fermentum eu a condimentum scelerisque scelerisque elementum facilisi ac ante natoque tempus cum vestibulum a a blandit cras porta. Ut dignissim ullamcorper parturient ac vitae sodales curae ad orci id scelerisque viverra egestas inceptos a a at magnis erat id sed torquent potenti ridiculus a. Ad pretium ligula a tempor vestibulum nisl fermentum duis amet ut suspendisse facilisis orci vestibulum consectetur natoque dis. Tristique a odio erat massa aliquam quisque scelerisque nisl himenaeos eu aliquam ante litora consectetur adipiscing laoreet eu eget porta adipiscing blandit fermentum leo ut a sed aliquet.
      </p>

      <p>
        Taciti eros suspendisse arcu a a curae in tristique eu congue lectus ac sociosqu dui lobortis ullamcorper a eget id ipsum curae leo a a a ut justo. Proin scelerisque sem habitant class ac ullamcorper habitasse duis elementum litora phasellus convallis magnis parturient a id id parturient quis taciti a suspendisse habitant ullamcorper tempor libero parturient porta. Quis mi augue tincidunt mus dapibus aliquet euismod sed vestibulum eu purus parturient aliquam tellus habitant natoque iaculis sagittis venenatis purus taciti.
      </p>

      <style jsx>{`
        h1,
        a {
          font-family: 'Arial';
        }

        ul {
          padding: 0;
        }

        li {
          list-style: none;
          margin: 5px 0;
        }

        a {
          text-decoration: none;
          color: blue;
        }

        a:hover {
          opacity: 0.6;
        }
      `}</style>
    </Layout>
  )
}
