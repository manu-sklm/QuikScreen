

1.leading-value --for line height
2.group and group-hover 

3. what diff does it makes on adding just "transition"

<div className='flex justify-center items-center mt-20'>
               <button className='bg-primary px-10 py-3 hover:bg-primary-dull rounded-md transition text-sm font-medium  cursor-pointer'>show more</button>
</div>


#### With transition:
When you hover over the button, the background color (bg-primary → bg-primary-dull) changes smoothly over a short time 
**(default is 150ms)**.

It feels modern and polished.

You can **enhance** it by adding duration-300, ease-in-out, etc.


#### adding blur circle --gave great look
               --**blur-xl**    : it blurs it bg color
                --bg-[somecolor]
                --rounded-full

                ---**aspect-square** : this keeps the square ration i.e same width and height  , also have aspect-[16/9] etc

4. scrollTo(0,0) : scroll to top

 <button onClick={()=>{ navigate('/movies'); scrollTo(0,0); }} > click me </button> 


5. object-cover vs bg-cover

   object-cover:   **The pixel clarity was really good cz it scales**
                 used on elements like <img> <video> <iframe>
                 CSS Equivalent: object-fit: cover;

                Behavior:
                Scales the image to fill the container while maintaining its aspect ratio.

                Parts of the image might be cropped if the container's aspect ratio differs.

                <img class="object-cover w-40 h-40" src="image.jpg" />

   bg-cover    :
                 used on 	Any element with a background-image



6. Truncate
        truncate in Tailwind CSS
        
    The truncate utility is used to cut off long text with an ellipsis (...) if it overflows its container, keeping the layout clean.                 

7.  space-y-2 : space 
      
        
                    <div className='text-sm space-y-2 '>
                            <p>Home</p> 
                            <p>About us</p>
                            <p>Contact us</p>
                            <p>Privacy policy</p>
                    </div>


8.  w-max  : equilavalent to "width:max-content" 
           “Make the width just wide enough to fit the longest unbreakable content (like text or inline elements), without wrapping"


           "So w-max makes the element grow only as wide as its longest content, and not more."
     <div className='overflow-x-auto no-scroll'>
               <div className='py-10 flex gap-5  w-max'>
              {
                dummyCastsData.map((cast)=>(
                  <div className='flex-col items-center justify-center w-full '>

                    <img src={cast.profile_path} alt="profileImage" className='aspect-square  rounded-full size-20 object-center object-cover'/>
                    <p className='text-sm'>{cast.name}</p>

                  </div>

                ))
              }
             </div>                    
                        


9. active:scale-95  -to a button

   shrinks the button when clicked


10. scrolling to a particular section when a button clicked

   **Problem:** scroll to the top of the component aligning with the top of the screen --which looks bad

   **Solution:** just adding padding to the of that section(div)  ,so the main content comes little down 


   1. Easy to is Using id and <a href="#id"> (HTML-native way)


        {/* Target section */}
        <div id="features" className="h-screen bg-gray-100">
        <h2>Features Section</h2>
        </div>

        {/* Scroll button */}
        <a href="#features">
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Go to Features</button>
        </a>



  2. **Using useRef Hook**   

        import React, { useRef } from 'react';

        export default function App() {
        const sectionRef = useRef(null);

        const scrollToSection = () => {
            sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        };

        return (
            <div>
            <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                onClick={scrollToSection}
            >
                Scroll to Section
            </button>

            <div className="h-screen"></div> {/* Spacer */}

            <div
                ref={sectionRef}
                className="h-screen bg-yellow-200 flex items-center justify-center"
            >
                🎯 Target Section
            </div>
            </div>
        );
        }


11. **SeatLayout** :
                    we are using just to run N times and return something everytime ,How weird . In Other Langs we just use for or while loop to traverse N times
 

                ✅ This is the general structure:
               
                Array.from({ length: N }, (element, index) => {
               
                return someValue;
                });


                So, in your example:

                Array.from({ length: count }, (_, i) => {
                return ();
                });


                🔍 It means:
                You're creating an array of count items.

                _ is the element (but since you're not using it, it’s just _).

                i is the index (from 0 to count - 1).

                return () means you're returning something (e.g., JSX or values) for each index.

