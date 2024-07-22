'use client';
import React, { useState, useEffect } from 'react';
import PlayerCard from '@/components/tradingCard/PlayerCard';
import dynamic from 'next/dynamic';
import PlayerData from './PlayerData';
import {
  IPlayerFront,
  IPlayerBack,
  TPitcherMetric,
  TCatcherMetric,
  TInfielderMetric,
} from '@/types';

interface PitcherDetailProps {
  player: IPlayerBack | null;
  metric: TPitcherMetric | TCatcherMetric | TInfielderMetric;
  position: 'pitcher' | 'catcher' | 'infielder' | 'outfielder';
}
const isPitcherMetric = (metric: any): metric is TPitcherMetric => {
  return metric.ERA !== undefined;
};

const isCatcherMetric = (metric: any): metric is TCatcherMetric => {
  return metric.FPCT !== undefined && metric.PB !== undefined;
};

const isInfielderMetric = (metric: any): metric is TInfielderMetric => {
  return metric.BA !== undefined && metric.OBP !== undefined;
};

export default function PitcherDetail({
  player,
  metric,
  position,
}: PitcherDetailProps) {
  console.log('metric', metric);
  const [showExpectedSeries, setShowExpectedSeries] = useState(false);
  const [isSpin, setIsSpin] = useState(false);
  console.log('prediction', metric.reason);
  useEffect(() => {
    if (isSpin) {
      const timer = setTimeout(() => setIsSpin(true), 1080); // Duration should match your CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isSpin]);
  console.log(isSpin);

  const handleAIButtonClick = () => {
    setShowExpectedSeries(true);
    setIsSpin(!isSpin);
  };

  console.log(isSpin);

  const PlayerChart = dynamic(() => import('@/components/player/PlayerChart'), {
    ssr: false,
  });

  if (!player) {
    return <div>Player not found</div>;
  }
  // console.log('Player data:', player);

  return (
    <>
      <div className="flex flex-col items-center bg-black/90 min-h-screen max-md:flex-wrap">
        <div className="flex w-3/4 items-center justify-center max-md:flex-wrap py-16 max-md:w-full">
          <div className="flex h-fit mx-6 items-center justify-self-center my-10 max-md:flex max-md:flex-col max-md:justify-items-center max-md:px-0 max-md:mx-0">
            <PlayerCard player={player} size="large" checkSpin={isSpin} />
          </div>
          {/* AI 파트 */}
          <div className="flex flex-col w-1/2 px-16 pl-22 max-md:pl-0 max-md:w-full max-md:flex-wrap max-md:px-2 max-md:mx-4">
            {/*그래프*/}
            <div className="w-full max-md:px-2 max-md:items-center">
              <PlayerChart
                positionMetric={metric}
                position={position}
                showExpectedSeries={showExpectedSeries}
              />
            </div>
            <div className="h-10 flex items-center justify-center max-md:pr-6">
              <button
                className="w-1/2 h-full flex items-center justify-center font-bold text-white text-base bg-red-90 rounded-[30px]"
                onClick={handleAIButtonClick}
              >
                선수 성적 예측하기
              </button>
            </div>
            {/* 한 줄 예측 */}
            <div className="pl-6 mt-3">
              <div className="text-white pl-6 mt-3 ">AI 예측</div>
              <div className="flex items-center rounded-[5px] border-2 text-white border-white h-auto w-5/6 mx-6 p-4 max-md:w-11/12 max-md:flex max-md:justify-center">
                <div className="text-white">{metric.reason}</div>
              </div>
            </div>
          </div>
        </div>
        <PlayerData player={player} />
      </div>
    </>
  );
}
