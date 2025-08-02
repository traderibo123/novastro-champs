import Image from 'next/image'

interface RankingData {
  [duration: string]: {
    rank: number | null
    title: string
  }
}

export default function ChampionCard({ username, data }: { username: string, data: RankingData }) {
  return (
    <div className="relative w-[768px] h-[768px] text-white font-sans" id="card">
      <Image
        src="/template.png"
        alt="Champion Background"
        fill
        className="object-cover z-0"
      />
      <div className="absolute inset-0 z-10">
        <div className="absolute top-[40px] left-[295px] text-3xl font-bold">
          @{username}
        </div>

        {[
          { time: '7d', top: 260 },
          { time: '30d', top: 335 },
          { time: '3m', top: 410 },
          { time: '6m', top: 485 },
          { time: '12m', top: 560 },
        ].map(({ time, top }) => (
          <div
            key={time}
            className="absolute flex gap-8 text-[20px] font-semibold"
            style={{ top: `${top}px`, left: '435px' }}
          >
            <span className="w-10 text-right">
              {data[time]?.rank !== null ? data[time]?.rank : '—'}
            </span>
            <span className="w-52">
              {data[time]?.title || 'Unranked'}
            </span>
          </div>
        ))}

        <button
          className="absolute bottom-[60px] right-[200px] z-20 px-4 py-2 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded text-white font-semibold shadow text-sm"
          onClick={() => {
            const tweetText = encodeURIComponent(
              "Check out my Novastro Champion Card! 👑 #Novastro $XNL @Novastro_xyz @traderibo123"
            )
            const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`
            window.open(tweetUrl, '_blank')
          }}
        >
          Share on X
        </button>

        <button
          className="absolute bottom-[60px] right-[60px] z-20 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded text-white font-semibold shadow text-sm"
          onClick={() => {
            const element = document.getElementById('card')
            if (!element) return
            import('html2canvas').then((html2canvas) => {
              html2canvas.default(element).then((canvas) => {
                const link = document.createElement('a')
                link.download = 'novastro_champion_card.png'
                link.href = canvas.toDataURL()
                link.click()
              })
            })
          }}
        >
          Download PNG
        </button>

        <div className="absolute bottom-[25px] w-full text-center text-xs text-gray-400 italic">
          Crafted by <a href="https://x.com/traderibo123" className="hover:underline">@traderibo123</a>
        </div>
      </div>
    </div>
  )
}
