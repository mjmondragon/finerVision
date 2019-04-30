<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 * @author Mauricio J Mondragon R <mauro102189@gmail.com>
 * 
 */
class Client extends Model
{
    protected $fillable = ['first_name', 'last_name', 'email', 'phone_number', 'birthday', 'gender', 'comment'];

    protected $dates = ['birthday'];


}
