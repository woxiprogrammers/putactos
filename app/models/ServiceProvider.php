<?php
/**
 * Created by PhpStorm.
 * User: sagar
 * Date: 5/12/14
 * Time: 3:31 PM
 */
use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class ServiceProvider extends Eloquent implements UserInterface, RemindableInterface {

    use UserTrait, RemindableTrait;

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'service_providers';
    /*
    -By default laraval consider primary key name is 'id'
    -To change My Default Primary key name

    */
    //protected $primaryKey = 'user_id';
    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    //protected $hidden = array('password', 'remember_token');

}
