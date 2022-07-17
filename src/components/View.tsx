export default function View({ title, body, bio }) {
  document.title = title 
  
  return (
    <div className="view">
      <h1>{title}</h1>
      <p>{bio}</p>
      <p>{body}</p>
    </div>
  )
}