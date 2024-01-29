import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const SkeletonCard = () => {
  return (
    <SkeletonTheme>
      <div className=" overflow-hidden rounded-xl md:rounded-3xl ">
        <Skeleton height={400} />
      </div>
    </SkeletonTheme>
  );
};

export default SkeletonCard;
