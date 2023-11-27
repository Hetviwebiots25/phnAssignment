<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Enquiry;

use Illuminate\Support\Facades\Http;

use Illuminate\Validation\Rule;

use App\Mail\TestEmail;

use Illuminate\Support\Facades\Mail;

class EnquiryController extends Controller
{
    //fatch state list using json file display in dropdown
    public function create()
    {
        // Fetch the list of states from the provided JSON URL
        $statesAndDistricts = $this->fetchStatesAndDistricts();

        return view('enquiry.create', compact('statesAndDistricts'));
    }

    // store the data in database
    public function store(Request $request)
{
    // Server-side validation
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email',
        'mobile' => [
            'required',
            'numeric',
            'digits:10',
            Rule::unique('enquiries')->ignore($request->id),
        ],
        'state' => 'required',
        'district' => 'required',
    ]);

     // Store the data in the database

     Enquiry::create($request->all());

     // Send email to the registered user
    
    //  $userEmail = $request->input('email');
    //  dd($userEmail);
    //  Mail::to($userEmail)->send(new TestEmail());
    // Mail::to($request->input('email'))->send(new TestEmail());
    
     // success message
     return redirect()->back()->with('success', 'Enquiry Form submitted successfully!');
}

    // fetch json state and districts data  decode code 
    private function fetchStatesAndDistricts()
    {
        try {
            $response = Http::get('https://raw.githubusercontent.com/sab99r/Indian-States-And-Districts/master/states-and-districts.json');
            return json_decode($response->body());
        } catch (\Exception $e) {
          
            return null;
        }
    }
}
