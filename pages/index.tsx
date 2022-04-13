import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { GA_TRACKING_ID } from '../lib/gtag';

export default function Home() {
  const socials = [
    {
      icon: faTwitter,
      name: 'twitter',
      href: 'https://www.twitter.com/SuboptimalEng',
      hoverClass: 'hover:text-twitter',
    },
    {
      icon: faYoutube,
      name: 'youtube',
      href: 'https://www.youtube.com/SuboptimalEng',
      hoverClass: 'hover:text-youtube',
    },
    {
      icon: faGithub,
      name: 'github',
      href: 'https://www.github.com/SuboptimalEng',
      hoverClass: 'hover:text-github',
    },
  ];

  return (
    <div>
      <Head>
        <title>Gamedex</title>
        <meta
          property="og:image"
          content="https://suboptimaleng.github.io/gdx_channel_art.png"
        />
        <meta property="og:title" content="Gamedex" />
        <meta
          property="description"
          content="3D game dev experiments built for the web with Three.js and React. Maintained by (Indian Software Engineer + YouTuber) SuboptimalEng."
        />
        <link rel="icon" href="/gdx_profile_pic.png" />

        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>

      <div className="min-h-screen bg-black text-white flex flex-col justify-center">
        {/* <div className="flex space-x-4 md:space-x-8 justify-center">
          <div className="text-4xl">frantic architect</div>
        </div> */}

        <div className="flex justify-center">
          <div className="flex flex-col">
            <div className="text-6xl pb-5">gamedex</div>
            <a href="https://gamedex.dev/frantic-architect">
              <div className="text-4xl hover:text-blue-600">
                frantic-architect
              </div>
            </a>
            <div className="flex space-x-1 text-base">
              <a href="https://github.com/SuboptimalEng/frantic-architect">
                <div className="hover:text-blue-600">[code]</div>
              </a>
              <a href="https://github.com/SuboptimalEng/frantic-architect">
                <div className="hover:text-blue-600">[demo]</div>
              </a>
            </div>

            <div className="flex pt-5 space-x-4">
              {socials.map((social, i) => {
                return (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-10"
                  >
                    <FontAwesomeIcon
                      icon={social.icon}
                      className={'relative z-10 h-12 ' + social.hoverClass}
                    ></FontAwesomeIcon>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
