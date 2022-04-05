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
      href: 'https://www.twitter.com/SuboptimalEng',
      hoverClass: 'hover:text-twitter',
    },
    {
      icon: faYoutube,
      href: 'https://www.youtube.com/SuboptimalEng',
      hoverClass: 'hover:text-youtube',
    },
    {
      icon: faGithub,
      href: 'https://www.github.com/SuboptimalEng',
      hoverClass: 'hover:text-github',
    },
  ];

  return (
    <div>
      <Head>
        <title>Suboptimal Engineer</title>
        <meta
          property="og:image"
          content="https://suboptimaleng.github.io/channel_art.png"
        />
        <meta property="og:title" content="Suboptimal Engineer" />
        <meta
          property="description"
          content="👨🏾‍💻 Indian Software Engineer + YouTuber"
        />
        <link rel="icon" href="/profile_pic.png" />

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
        <div className="flex space-x-4 md:space-x-8 justify-center">
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
                  className={'relative z-10 h-16 md:h-24 ' + social.hoverClass}
                ></FontAwesomeIcon>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
