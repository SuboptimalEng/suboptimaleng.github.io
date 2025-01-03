import Head from 'next/head';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTwitter,
  faYoutube,
  faGithub,
  faInstagram,
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
    {
      icon: faInstagram,
      name: 'instagram',
      href: 'https://www.instagram.com/SuboptimalEng',
      hoverClass: 'hover:text-instagram',
    },
  ];

  // const fontSize = 'text-3xl hover:bg-white hover:text-black';
  const fontSize = 'text-4xl hover:bg-white hover:text-black';

  return (
    <div>
      <Head>
        <title>Suboptimal Engineer</title>
        <meta
          property="og:image"
          content="https://suboptimaleng.github.io/thumbnail_se.png"
        />
        <meta property="og:title" content="Suboptimal Engineer" />
        <meta
          property="description"
          content="Indian software engineer and YouTuber interested in web development and graphics programming."
        />
        <link rel="icon" href="/profile_se.png" />

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
            <div className="text-6xl pb-8">sub eng</div>

            {/* <Link href="https://suboptimaleng.github.io/random"> */}
            <Link href="/slime-sim-webgpu">
              <a>
                <div className={fontSize}>slime-sim-webgpu</div>
              </a>
            </Link>

            <Link href="/shader-sandbox">
              <a>
                <div className={fontSize}>shader sandbox</div>
              </a>
            </Link>

            {/* <Link href="/three-js-experiments">
              <a>
                <div className={fontSize}>three.js experiments</div>
              </a>
            </Link>

            <Link href="/webgpu-experiments">
              <a>
                <div className={fontSize}>webgpu experiments</div>
              </a>
            </Link> */}

            <Link href="/snakes-and-portals">
              <a>
                <div className={fontSize}>snakes + portals</div>
              </a>
            </Link>

            <Link href="/frantic-architect">
              <a>
                <div className={fontSize}>frantic architect</div>
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
                      className={'relative z-10 h-14 ' + social.hoverClass}
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
