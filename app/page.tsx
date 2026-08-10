import Link from "next/link";

export default function LanguageGateway() {
  return <main className="gateway"><div className="gateway-mark">JK</div><p>JeffKM</p><h1>Choose your language</h1><div><Link href="/ko/">한국어</Link><Link href="/en/">English</Link></div><script dangerouslySetInnerHTML={{__html:`try{var l=(navigator.language||'').toLowerCase();if(!sessionStorage.getItem('jeffkm-locale-seen')){sessionStorage.setItem('jeffkm-locale-seen','1');location.replace(l.startsWith('ko')?'/ko/':'/en/')}}catch(e){}`}}/></main>;
}
