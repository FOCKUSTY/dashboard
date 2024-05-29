let historyArray: any[] = [];

let dateForm: any;

const dateCheck = (date: string | number | Date, form='dd.MM.yyyy HH:mm:ss') =>
{
    if(!date)
        return null;

    dateForm = new Date(date).getTime();
    return dateForm;
};

const checkMinus = (num: number) =>
{
    if (num < 0) return -num
    else return num;
};

const checkInfinity = (num: number, func: any) =>
{
  if(num === Infinity || num === -Infinity) func()
  else return;
}

const checkNull = (num: number, plusRandom=false) =>
{
  if(num === 0)
  {
    if(!plusRandom) return num + 1
    else return num + Math.round(Math.random()*1000);
  }
  else return num;
};

const chanceBetween = ( chance=50, funcOne: any, funcTwo: any, num: number) =>
{
  if(num < chance) funcOne()
  else funcTwo();
};
  
const historyPseudoRandomNumber = (min: number, max: number, n: number, m: number, arr: any, yourArr: any, array: any, num: number) =>
{
  function checkArrays()
  {
    if(yourArr.length === max)
    {
      for(let el of array)
      {
        if(yourArr[num] === el)
        {
          num = pseudoRandomNumber(min, max, n, m, arr, undefined, undefined, false, true, true);
          checkArrays();
        };
      };
    };
  };
  checkArrays();
  
  array.push(yourArr[num]);
  
  if(array.length>n)
  {
    array.shift();
    array.shift();
  };

  return num;
};

const historyRandom = (num: number, min=0, max=100, array: any[], n=3, dOaF=1, pseudoRandom=false) =>
{
  let
    iMin,
    iMax;

  function check()
  {
    for(let i of array)
    {
      iMin = i-dOaF;
      iMax = i+dOaF;
      if( num===i || ( num > iMin && num < iMax ) )
      {
        if( pseudoRandom ) num = pseudoRandomNumber(min, max, n, dOaF, array, undefined, undefined, false, false, false);
      };
    };
  };

  for (let {} of array) check();
  check();
  array.push( num );

  if(array.length > n)
  {
    array.shift();
    array.shift();
  };

  return num;
};

function pseudoRandomNumber(min=0, max=100, n=3, m=2, historyArr=historyArray, yourArr?: any[], array?: any[], history:any = true, chanceNull=true, chanceMax=true)
{
  let
    someMin,
    someMax;
  
  if(min === max)
  {
    if(max === 0) max +=100;
    
    min = 0;
  };

  let random = Math.round(Math.random()*1000);
  
  if(random === 0)
    random += 1;

  if(min===0)
    someMin = min + 1;
  
  else
    someMin = min;
  
  someMax = max * random;

  let seconds = Number(dateCheck(Date.now(), 'mm'));
  let minutes = Number(dateCheck(Date.now(), 'ss'));
  let hours = Number(dateCheck(Date.now(), 'HH'));

  if(seconds === 0)
    seconds += 1;
  
  if(minutes === 0)
    minutes += 1;

  if(hours === 0)
    hours += 1;

  const first = someMin * someMax + ((someMax - someMin) * someMax) + random**2
  const second = random * random * (someMax ** 2)
  const third = Date.now()/10000/random;
  const fourth = (seconds / minutes / hours);

  const
    maxLength = `${max}`.length, minLength = `${min}`.length,

    randomNumber = BigInt(`${(first + second) * (third + fourth) / (maxLength ** minLength * 100)}`.replace('.', '')),

    text = `${randomNumber}`;

  let number = Number( text.slice( Math.round(text.length/2), Math.round(text.length/2+maxLength) ) );
  
  function checkMax()
  {
    if(number > max)
    {
      number = checkMinus( checkNull( number, true ) ) - checkMinus( checkNull ( max, true ) );
      checkMax();
    }
  };

  checkMax();

  if(chanceNull)
  {
    chanceBetween(5, ()=>{ number = 0 }, ()=>{ number = number }, pseudoRandomNumber( 0, 100, n, m, array, undefined, undefined, false, false, false ) );
  };

  if(chanceMax)
  {
    chanceBetween(5, ()=>{ number = max }, ()=>{ number = number }, pseudoRandomNumber( 0, 100, n, m, array, undefined, undefined, false, false, false ) );
  };
  
  if(history)
    number = historyRandom(number, min, max, historyArr, n, m, false);

  if( yourArr && array && history )
    number = historyPseudoRandomNumber(min, max, n, m, historyArr, yourArr, array, number);

  if(!chanceNull && number === 0)
    number+=min;

  return number;
}

export
{
  pseudoRandomNumber,
  historyPseudoRandomNumber,
  historyRandom,
  checkMinus,
  checkInfinity,
  checkNull,
  chanceBetween,
}