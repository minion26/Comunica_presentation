import { QueryEngine } from '@comunica/query-sparql';


const engine = new QueryEngine();


async function getAlbumsByArtist(name) {
  const result = await engine.queryBindings(`
  PREFIX : <http://example.org/music#>
  SELECT ?title ?year WHERE {
    ?artist a :Artist ; :name "${name}" ; :made ?album .
    ?album :title ?title ; :year ?year .
  }
`, { sources: ['music.ttl'] });


  return result.toArray();
}

// GraphQL Resolver 
const resolvers = {
  Query: {
    artist: async (_, { name }) => ({ name })
  },
  Artist: {
    albums: async (artist) => getAlbumsByArtist(artist.name)
  }
};

