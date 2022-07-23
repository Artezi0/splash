export default function View({ title, body, bio, cover }) {
  document.title = title 
  
  console.log(cover)

  return (
    <div className="view">
      {cover.isCover && 
        <div style={{
          width: '100px',
          aspectRatio: '1/1',
          background: cover.value
        }}></div>
      }
      <h1>{title}</h1>
      <p>{bio}</p>
      <p>{body}</p>
    </div>
  )
}