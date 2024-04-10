const getData = async (graphqlBody: any) => {
  const res = await fetch('https://funky-meerkat-27.hasura.app/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_KEY || ''
    },
    body: JSON.stringify(graphqlBody)
  })
  return await res.json();
}

export default getData;