import SparklesText from "@/components/ui/magicUi/sparkles-text";

export default function Prize() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* <div className="flex h-[100px] w-[240px]">
        <div className="whitespace-nowrap pl-2 pt-6 font-notoSans text-2xl font-bold text-[#a97267]">
          本池獎品
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 800 650"
        >
          <g
            stroke-width="17"
            stroke="hsl(28, 62%, 61%)"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            transform="matrix(0.9702957262759965,-0.24192189559966787,0.24192189559966787,0.9702957262759965,-80.88704875026576,108.65046772946857)"
          >
            <path
              d="M196.0458984375 199Q653.0458984375 317 598.0458984375 601 "
              marker-end="url(#SvgjsMarker3798)"
            ></path>
          </g>
          <defs>
            <marker
              markerWidth="7"
              markerHeight="7"
              refX="3.5"
              refY="3.5"
              viewBox="0 0 7 7"
              orient="auto"
              id="SvgjsMarker3798"
            >
              <polyline
                points="0,3.5 3.5,1.75 0,0"
                fill="none"
                stroke-width="1.1666666666666667"
                stroke="hsl(28, 62%, 61%)"
                stroke-linecap="round"
                transform="matrix(1,0,0,1,1.1666666666666667,1.75)"
                stroke-linejoin="round"
              ></polyline>
            </marker>
          </defs>
        </svg>
      </div> */}
      <div className="flex h-full items-center justify-center p-8 font-bold">
        <SparklesText text="小小零食" />
      </div>
    </div>
  );
}
