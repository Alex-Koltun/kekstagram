var calculateDeposit = function (sumDep, percent, termOfMounth, capitalization){
if(capitalization === false &&(0 <= percent >= 100)) {
       sumDep = (((sumDep * (percent/12)) * termOfMounth) + sumDep);
      return Math.round(sumDep);
  }

  // if(capitalization === true) {
  // while (var i = 0; i = termOfMounth) {
  //   sumDep = (percent/12) + sumDep;
  //   };
  // }
};

calculateDeposit(500,10, 36, false);
