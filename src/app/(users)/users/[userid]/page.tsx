
type Props = {
    params : Promise<{userid: string}>
}

async function Profile( {params} : Props) {
    const userId = (await params).userid; 
    return (
        <div>Profile : {userId}</div>
    )
}

export default Profile