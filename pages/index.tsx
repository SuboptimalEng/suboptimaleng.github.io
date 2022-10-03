import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faYoutube,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { GA_TRACKING_ID } from '../utils/gtag';

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
          content="https://suboptimaleng.github.io/thumbnail_dd.png"
        />
        <meta property="og:title" content="Gamedex" />
        <meta
          property="description"
          content="3D game dev experiments built for the web with Three.js and React. Maintained by (Indian Software Engineer + YouTuber) SuboptimalEng."
        />
        <link rel="icon" href="/profile_dd.png" />

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
        <div className="flex justify-center">
          <div className="flex flex-col space-y-4">
            <div className="text-7xl pb-8">gamedex</div>

            <Link href="/shader-sandbox">
              <a>
                <div className="text-5xl hover:bg-white hover:text-black">
                  shader sandbox
                </div>
              </a>
            </Link>

            <Link href="/snakes-and-portals">
              <a>
                <div className="text-5xl hover:bg-white hover:text-black">
                  snakes + portals
                </div>
              </a>
            </Link>

            <Link href="/frantic-architect">
              <a>
                <div className="text-5xl hover:bg-white hover:text-black">
                  frantic architect
                </div>
              </a>
            </Link>
            <div className="flex pt-8 space-x-4">
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
                      className={'relative z-10 h-16 ' + social.hoverClass}
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
