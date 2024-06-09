type FireuxLogoProps = {
  width?: string;
  className?: string;
};

function FireuxLogo({ width, className }: FireuxLogoProps) {
  return (
    <svg
      width={width ?? '100'}
      viewBox="0 0 580 148"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M16.3489 128.698L17.6376 49.8928L74.0714 49.8928C66.5714 72.7939 60.4999 71.0001 39.2859 71.652L39.2859 99.5002C34.9988 117.782 22.952 112.985 16.3489 128.698Z"
        fill="url(#paint0_linear_392_22)"
      />
      <path
        d="M26.9999 24.0001C36.9999 22 90.5 23 90.5 23C76 32 80.4999 42.5 71.9999 42.5L17.6381 42.5C17.6381 42.5 16.9999 26.0001 26.9999 24.0001Z"
        fill="url(#paint1_linear_392_22)"
      />
      <path
        d="M143.574 69.9638H183.894V85.5638H143.574V69.9638ZM145.014 116.164H125.574V32.1638H189.054V47.7638H145.014V116.164ZM202.215 116.164V32.1638H221.655V116.164H202.215ZM241.59 116.164V32.1638H277.95C285.47 32.1638 291.95 33.4038 297.39 35.8838C302.83 38.2838 307.03 41.7638 309.99 46.3238C312.95 50.8838 314.43 56.3238 314.43 62.6438C314.43 68.8838 312.95 74.2838 309.99 78.8438C307.03 83.3238 302.83 86.7638 297.39 89.1638C291.95 91.5638 285.47 92.7638 277.95 92.7638H252.39L261.03 84.2438V116.164H241.59ZM294.99 116.164L273.99 85.6838H294.75L315.99 116.164H294.99ZM261.03 86.4038L252.39 77.2838H276.87C282.87 77.2838 287.35 76.0038 290.31 73.4438C293.27 70.8038 294.75 67.2038 294.75 62.6438C294.75 58.0038 293.27 54.4038 290.31 51.8438C287.35 49.2838 282.87 48.0038 276.87 48.0038H252.39L261.03 38.7638V86.4038ZM347.712 66.0038H388.152V81.1238H347.712V66.0038ZM349.152 100.564H394.872V116.164H329.832V32.1638H393.312V47.7638H349.152V100.564ZM447.66 117.604C435.74 117.604 426.42 114.284 419.7 107.644C412.98 101.004 409.62 91.5238 409.62 79.2038V32.1638H429.06V78.4838C429.06 86.4838 430.7 92.2438 433.98 95.7638C437.26 99.2838 441.86 101.044 447.78 101.044C453.7 101.044 458.3 99.2838 461.58 95.7638C464.86 92.2438 466.5 86.4838 466.5 78.4838V32.1638H485.7V79.2038C485.7 91.5238 482.34 101.004 475.62 107.644C468.9 114.284 459.58 117.604 447.66 117.604ZM494.138 116.164L530.258 66.3638V80.5238L495.698 32.1638H517.778L541.658 65.8838L532.418 66.0038L555.938 32.1638H577.058L542.738 79.6838V65.7638L579.098 116.164H556.658L531.938 80.5238H540.818L516.458 116.164H494.138Z"
        fill="white"
        className="dark:fill-white fill-frx-blue-900"
      />
      <defs>
        <linearGradient
          id="paint0_linear_392_22"
          x1="10.5117"
          y1="55.5002"
          x2="95.5117"
          y2="103"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#D94355" />
          <stop offset="1" stopColor="#FF2929" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_392_22"
          x1="10.5117"
          y1="55.5002"
          x2="95.5117"
          y2="103"
          gradientUnits="userSpaceOnUse">
          <stop stopColor="#D94355" />
          <stop offset="1" stopColor="#FF2929" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default FireuxLogo;
