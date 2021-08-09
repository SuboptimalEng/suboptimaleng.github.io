import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faYoutube,
  faGithub,
  faTwitterSquare,
  faYoutubeSquare,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';

export default function Home() {
  const socials = [
    {
      icon: faTwitter,
      href: 'https://www.twitter.com/SuboptimalEng',
      hoverClass: 'text-twitter',
    },
    {
      icon: faYoutube,
      href: 'https://www.youtube.com/SuboptimalEng',
      hoverClass: 'text-youtube',
    },
    {
      icon: faGithub,
      href: 'https://www.github.com/SuboptimalEng',
      hoverClass: 'text-github',
    },
    // {
    //   icon: faTwitterSquare,
    //   href: 'https://www.twitter.com/SuboptimalEng',
    //   hoverClass: 'bg-twitter',
    // },
    // {
    //   icon: faYoutubeSquare,
    //   href: 'https://www.youtube.com/SuboptimalEng',
    //   hoverClass: 'bg-youtube',
    // },
    // {
    //   icon: faGithubSquare,
    //   href: 'https://www.github.com/SuboptimalEng',
    //   hoverClass: 'bg-github',
    // },
  ];

  return (
    <div>
      <Head>
        <title>Suboptimal Engineer</title>
        <meta
          name="description"
          content="The typical blog of an atypical Indian guy who quit his tech job to become a YouTuber."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col justify-center">
        <div className="flex space-x-2 justify-center">
          {socials.map((social, i) => {
            return (
              // Change text-color.
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                className="relative z-10"
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className={'z-10 h-16 md:h-24 hover:' + social.hoverClass}
                ></FontAwesomeIcon>
              </a>

              // Change bg-color.
              // <div
              //   key={i}
              //   className={
              //     'relative flex h-12 md:h-20 place-items-center rounded-lg hover:' +
              //     social.hoverClass
              //   }
              // >
              //   <a href={social.href} target="_blank" className="relative z-10">
              //     <FontAwesomeIcon
              //       icon={social.icon}
              //       className="z-10 h-16 md:h-24"
              //     ></FontAwesomeIcon>
              //   </a>
              // </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
