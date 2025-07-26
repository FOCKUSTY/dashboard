import { Api } from "api"
import { FaDiscord, FaGithub, FaTelegram } from "react-icons/fa"

export const Logo = () => {
  return (
    <div id="logo">
      <h1>The Void</h1>
      <div className="links">
        <a href={Api.the_void.discord_url} target="_blank">
          <FaDiscord size={24} />
        </a>
        <a href={Api.the_void.telegram_url} target="_blank">
          <FaTelegram size={24} />
        </a>
        <a href={Api.the_void.github_url} target="_blank">
          <FaGithub size={24} />
        </a>
      </div>
    </div>
  )
}