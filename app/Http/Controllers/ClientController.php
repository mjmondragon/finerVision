<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use Carbon\Carbon;

/**
 * @author Mauricio J Mondragon R <mauro102189@gmail.com>
 */
class ClientController extends Controller
{
    public function create(Request $request)
    {
        $this->validateForm($request);
        $client = new Client($request->except(['_token', 'birthday']));
        $birthday = Carbon::createFromFormat('d/m/Y', $request->birthday);
        $client->birthday = $birthday;
        $client->save();
        return $client;
    }
    public function validateForm(Request $request)
    {
        $this->validate($request, $this->formRules());
    }
    public function formRules()
    {
        return [
                'first_name' => 'required|string|max:255',
                'last_name' => 'required|string|max:255',
                'email' => 'required|email',
                'phone_number' => 'required|regex:/[0-9]{11}$/i',
                'gender' => 'required',
                'birthday' => 'required|date_format:d/m/Y'
            ];
    }
}
