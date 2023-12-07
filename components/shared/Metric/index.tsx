import Image from 'next/image';
import Link from 'next/link';

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyles?: string;
  isAuthor?: boolean;
}

const MetricContent = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  isAuthor,
  textStyles
}: MetricProps) => {
  return (
    <>
      <Image
        src={imgUrl}
        width={16}
        height={16}
        alt={alt}
        className={`object-contain ${href ? 'rounded-full ' : ''}`}
      />
      <div className={`${textStyles} flex h-[16px] items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? 'max-sm:hidden' : ''
          }`}
        >
          {title}
        </span>
      </div>
    </>
  );
};

const Metric = ({
  imgUrl,
  alt,
  value,
  title,
  href,
  isAuthor,
  textStyles
}: MetricProps) => {
  const metricContent = (
    <MetricContent
      imgUrl={imgUrl}
      alt={alt}
      value={value}
      title={title}
      isAuthor={isAuthor}
      textStyles={textStyles}
      href={href}
    />);
  if (href) {
    return (
      <Link href={href} className="flex-center gap-1">
        {metricContent}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
