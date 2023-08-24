interface PhotoProps {
    url: string,
    remove: (url: string) => void,
}

export const Photo = ({ url, remove }: PhotoProps) => {
  return (
    <div className="photo-item">
        <img src={url} width="150px" height="150px" alt="" />
        <span className="photo-delete" onClick={() => remove(url)}>X</span>
    </div>
  )
}
